import React from "react";
import Image from "next/image";
import Code from "../components/code";

const IMG_PREFIX = process.env.NODE_ENV == "production" ? "/interfaces_blog" : "";

export default function Article() {
  return (
    <article>
      <div className="w-full h-60 mb-10 rounded-md relative">
        <Image
          src={`${IMG_PREFIX}` + `/abstract2.jpg`}
          alt={"alt"}
          style={{ borderRadius: "6px", objectFit: "cover" }}
          fill
        />
        <h1 className="px-2 m-2 absolute bottom-0 bg-background rounded-md">Atomics, Locks and Micro Benchmarks</h1>
      </div>
      <h2 className="mb-4">Introduction</h2>
      <p>
        I&apos;m working on a rust crate that implements a FIFO queue using atomics so I&apos;ve begun a series of
        experiments to understand how they work. Atomics are new to me and I want to get an idea on what I&apos;m
        dealing with, perhaps these notes will also be useful to anybody that wants to get a feel of what are the
        performance tradeoffs involved.
        <br />
        <br />
        In simple terms, atomic types and operations are building blocks for concurrent programming, allowing for
        indivisible operations on shared memory without the costly synchronization of traditional locks. It&apos;s an
        interesting subject to me and it gives me a chance to take a pause from traditional locks. If you&apos;re
        interested in the subject I recommend the CPPCon YT videos, they are a gold mine when it comes to
        high-performance computing and{" "}
        <a
          href="https://en.wikipedia.org/wiki/Lock_(computer_science)"
          className="underline"
          rel={"nofollow"}
          target="_blank"
        >
          <em>lock-free</em>
        </a>{" "}
        programming.
        <br />
        <br />
        With performance sensitive code, even an innocent-looking operation may imply a significant penalty in
        performance, and I&apos;d like to avoid that. To understand better the possible performance issues I want to
        look at the disassembled code as well. Perhaps that will help in explaining some of the results.
        <br />
        <br />
      </p>
      <h2 className="mb-4">Setup</h2>
      <p>
        As a starting point, I&apos;ve defined a simple <mark>nop</mark> function – an operation that does absolutely
        nothing. This serves to establish a baseline performance measurement. Then, I&apos;m progressively testing more
        complex functions adding operations. The goal is to observe some performance regression and perhaps understand
        what&apos;s behind it. A few notes:
      </p>
      <ul className="list-disc my-2 text-textcolor">
        <li className="ml-8">
          I&apos;m using an old i7 Mac in case you&apos;re wondering. Althugh I&apos;ll be posting only relative
          performances in this article.
        </li>
        <li className="ml-8">I&apos;m using the standard memory allocator (no jemalloc/mimalloc),</li>
        <li className="ml-8">
          I&apos;m compling with <mark>opt-level=3</mark>.
        </li>
        <li className="ml-8">
          I&apos;m not using <mark>perf</mark> or similar for this one, just measuring time. It&apos;s not the perfect
          way to proceed but it should be enough to give me a sense of what I&apos;m working with. I measure average
          execution time and variance. I&apos;m aiming at having better benchmarks (with{" "}
          <a href="https://crates.io/crates/criterion" className="underline" rel={"nofollow"} target="_blank">
            <em>criterion</em>
          </a>
          ) for part 2.
        </li>
      </ul>
      <p>
        Let&apos;s look at the <mark>nop</mark> function and its disassembled code. They are almost 1-to-1 comparable:
      </p>
      <div className="my-4 md:flex overflow-scroll rounded-md bg-code">
        <div className="p-4">
          <div className="mb-3 border-b border-neutral-500">rust</div>
          <Code
            lineNumbers={false}
            lang="rust"
            code={`fn nop() {
    black_box(());
}`}
          />
        </div>
        <div className="p-4">
          <div className="mb-3 border-b border-neutral-500">asm</div>
          <Code
            lineNumbers={false}
            lang="asm"
            code={`push    rax
call    qword ptr [rip + core::hint::black_box::h86d1574ace50d079@GOTPCREL]
pop     rax
ret`}
          />
        </div>
      </div>
      <p>
        No surprises here, it is indeed simple. Overall the compiler is aggressive but quite smart. Without the{" "}
        <mark>black_box</mark> the whole function would be optimized away, so we need to suggest the compiler to not
        remove it. Also in the function <mark>try_push</mark> (down below), bounds check are eliminated depending if the
        writes are in the loop or outside. I guess it&apos;s not all that surprising but it&apos;s cool to see.
        <br /> <br /> First, I&apos;ll measure the time of the following iterated call to <mark>nop</mark>, just to set
        a baseline performance:
      </p>
      <div className="my-4 rounded-md bg-code">
        <div className="p-4">
          <Code
            lineNumbers={false}
            lang="rust"
            code={`const ITERS: u64 = 10_000_000;

#[inline(never)]
fn nop() {
    for _ in 1..ITERS {
        black_box(());
    }
}
`}
          ></Code>
        </div>
      </div>
      <p>
        After that, I want to make some tests with an increasing amount of operations, using functions that I would need
        to use for the queue:
      </p>
      <div className="my-4 rounded-md bg-code">
        <div className="p-4">
          <Code
            lineNumbers={false}
            lang="rust"
            code={`#[inline(never)]
fn atomic_load(val: &AtomicU64) {
    for _ in 1..ITERS {
        val.load(Ordering::Acquire);
    }
}

#[inline(never)]
fn atomic_load_store(val: &AtomicU64) {
    for i in 1..ITERS {
        black_box(val.store(i, Ordering::Release));
        black_box(val.load(Ordering::Acquire));
    }
}

// here "slice" stores "ITERS" number of elements
#[inline(never)]
fn try_push(val: &AtomicU64, slice: &mut Box<[MaybeUninit<u64>]>) {
    for i in 1..slice.len() {
        black_box(val.load(Ordering::Relaxed));
        black_box(val.load(Ordering::Acquire));
        slice[i].write(i as u64);
    }
}`}
          ></Code>
        </div>
      </div>
      <p>
        In case you&apos;re curious, the disassembled code for the load and store are here below. It doesn&apos;t look
        intimidating so we shouldn&apos;t have a large performance degradation.
      </p>
      <div className="my-4 md:flex overflow-scroll rounded-md bg-code">
        <div className="p-4">
          <div className="mb-3 border-b border-neutral-500">rust</div>
          <Code lineNumbers={false} lang="rust" code={`val.load(Ordering::Acquire);`} />
        </div>
        <div className="p-4">
          <div className="mb-3 border-b border-neutral-500">asm</div>
          <Code
            lineNumbers={false}
            lang="asm"
            code={`mov     rax, qword ptr [rdi]
mov     qword ptr [rsp - 8], rax
lea     rax, [rsp - 8]`}
          />
        </div>
      </div>
      <div className="my-4 md:flex overflow-scroll rounded-md bg-code">
        <div className="p-4">
          <div className="mb-3 border-b border-neutral-500">rust</div>
          <Code lineNumbers={false} lang="rust" code={`val.store(1, Ordering::Release)`} />
        </div>
        <div className="p-4">
          <div className="mb-3 border-b border-neutral-500">asm</div>
          <Code lineNumbers={false} lang="asm" code={`mov     qword ptr [rdi], 1`} />
        </div>
      </div>
      <h2 className="my-4">First Results</h2>
      <p>Time to test things out. Here are the results averaged over 25 tests:</p>
      <table className="-ml-4 my-4 border-separate border-spacing-x-4 border-spacing-y-2">
        <thead>
          <tr className="text-left space-x-4">
            <th className="border-b">Test</th>
            <th className="border-b">Ratio</th>
            <th className="border-b">Variance</th>
            <th className="border-b">Visual</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>nop</td>
            <td>1</td>
            <td>0.18</td>
            <td className="w-full">
              <div className="w-[20px] bg-emerald-400 text-emerald-400">|</div>
            </td>
          </tr>
          <tr>
            <td>atomic_load</td>
            <td>1.47</td>
            <td>0.25</td>
            <td className="w-full">
              <div className="w-[29.4px] bg-emerald-400 text-emerald-400">|</div>
            </td>
          </tr>
          <tr>
            <td>atomic_load_store</td>
            <td>3.34</td>
            <td>0.4</td>
            <td className="w-full">
              <div className="w-[66.8px] bg-emerald-400 text-emerald-400">|</div>
            </td>
          </tr>
          <tr>
            <td>try_push</td>
            <td>5.17</td>
            <td>24.45</td>
            <td className="w-full">
              <div className="w-[103.4px] bg-emerald-400 text-emerald-400">|</div>
            </td>
          </tr>
        </tbody>
      </table>
      <p>I can attempt a to draw a couple of conclusions:</p>
      <ul className="list-disc my-2 text-textcolor">
        <li className="ml-8">
          Atomic loads and stores are fast. Only slightly slower than <mark>nop</mark>.
        </li>
        <li className="ml-8">
          It&apos;s not surprising that <mark>atomic_load_store</mark> takes about twice as long as{" "}
          <mark>atomic_load</mark> given that we&apos;re doing nearly twice as many operations.
        </li>
        <li className="ml-8">
          The much slower <mark>try_push</mark> is writing to memory, I&apos;m guessing that&apos;s what&apos;s behind
          the performance hit. The variance is also much higher.
        </li>
      </ul>
      <h2 className="my-4">Atomic Operations</h2>
      <p>
        Next, I want to test atomic operations, in particular, <mark>fetch_add</mark> and <mark>compare_exchange</mark>.
        These are often used in lock-free programming and I may need them in the queue logic. Here below are the test
        functions.
      </p>
      <div className="my-4 md:flex overflow-scroll rounded-md bg-code">
        <div className="p-4">
          <Code
            lang="rust"
            lineNumbers={false}
            code={`#[inline(never)]
fn fetch_add(val: &AtomicU64) {
    for i in 1..ITERS {
        val.fetch_add(i, Ordering::Release);
    }
}

#[inline(never)]
fn cas(val: &AtomicU64) {
    for i in 1..ITERS {
        let current = val.load(Ordering::Relaxed);
        let _ = val.compare_exchange(current, i, Ordering::Release, Ordering::Relaxed);
    }
}`}
          ></Code>
        </div>
      </div>
      <p>The results are below (where I repeat the previous ones for clarity):</p>
      <table className="-ml-4 my-4 border-separate border-spacing-x-4 border-spacing-y-2">
        <thead>
          <tr className="text-left space-x-4">
            <th className="border-b">Test</th>
            <th className="border-b">Ratio</th>
            <th className="border-b">Variance</th>
            <th className="border-b">Visual</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>nop</td>
            <td>1</td>
            <td>0.18</td>
            <td className="w-full">
              <div className="w-[4px] bg-emerald-400 text-emerald-400">|</div>
            </td>
          </tr>
          <tr>
            <td>atomic_load</td>
            <td>1.47</td>
            <td>0.25</td>
            <td className="w-full">
              <div className="w-[5.88px] bg-emerald-400 text-emerald-400">|</div>
            </td>
          </tr>
          <tr>
            <td>atomic_load_store</td>
            <td>3.34</td>
            <td>0.4</td>
            <td className="w-full">
              <div className="w-[13.36px] bg-emerald-400 text-emerald-400">|</div>
            </td>
          </tr>
          <tr>
            <td>try_push</td>
            <td>5.17</td>
            <td>24.45</td>
            <td className="w-full">
              <div className="w-[20.68px] bg-emerald-400 text-emerald-400">|</div>
            </td>
          </tr>
          <tr>
            <td className="text-[#33ffbd]">fetch_add</td>
            <td>16.05</td>
            <td>0.68</td>
            <td className="w-full">
              <div className="w-[64.2px] bg-emerald-400 text-emerald-400">|</div>
            </td>
          </tr>
          <tr>
            <td className="text-[#33ffbd]">cas</td>
            <td>25.34</td>
            <td>3.27</td>
            <td className="w-full">
              <div className="w-[101.36px] bg-emerald-400 text-emerald-400">|</div>
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        Now we&apos;re starting to see a real performance drop, although notice how the variance of the new tests is
        back down, close to the &quot;nop&quot; variance. I&apos;m going straight to the assembly for the{" "}
        <mark>fetch_add</mark>:
      </p>
      <div className="my-4 md:flex overflow-scroll rounded-md bg-code">
        <div className="p-4">
          <Code
            lang="asm"
            lineNumbers={false}
            code={`// fetch_add function
fetch_add:
        mov     eax, 1
.LBB0_1:
        lock            add     qword ptr [rdi], rax
        lea     rcx, [rax + 1]
        lock            add     qword ptr [rdi], rcx
        lea     rcx, [rax + 2]
        lock            add     qword ptr [rdi], rcx
        lea     rcx, [rax + 3]
        lock            add     qword ptr [rdi], rcx
        lea     rcx, [rax + 4]
        lock            add     qword ptr [rdi], rcx
        lea     rcx, [rax + 5]
        lock            add     qword ptr [rdi], rcx
        lea     rcx, [rax + 6]
        lock            add     qword ptr [rdi], rcx
        lea     rcx, [rax + 7]
        lock            add     qword ptr [rdi], rcx
        lea     rcx, [rax + 8]
        lock            add     qword ptr [rdi], rcx
        add     rax, 9
        cmp     rax, 10000000
        jne     .LBB0_1
        ret`}
          ></Code>
        </div>
      </div>
      <p>
        There is indeed some form of locking involved with the atomic <mark>fetch_add</mark>. I&apos;m guessing this is
        the reason behind the results, there isn&apos;t really much else in the function. I don&apos;t see it as a
        discouraging fact though, just because there is <em>some form</em> of locking it doesn&apos;t mean that
        we&apos;re back to square one. This form of hardware-level locking is <em>not like</em> the mutexes we&apos;re
        used to, There are two important ideas to mention:
      </p>
      <ul className="my-2 text-textcolor list-disc">
        <li className="ml-8">
          we are avoiding explicit locking acquisition and release in the code. I bet this saves us time.
        </li>
        <li className="ml-8">Progress is guaranteed in a well-designed lock-free multithreaded algorithm.</li>
      </ul>
      <p>
        As I understand it, in lock-free multithreaded algorithms, one thread is guaranteed to make progress, so overall
        our system doesn&apos;t reach a deadlocked state, and this is a significant victory. Of course we can still make
        mistakes in our program logic, leading to one thread to read the wrong/outaded value, so atomic operations alone{" "}
        <a href="https://lwn.net/Articles/847973/" className="underline" rel={"nofollow"} target="_blank">
          aren&apos;t sufficient
        </a>{" "}
        for logical soundness.
        <br />
        <br />
        In other words, since there is no mutual exclusion, shared memory is not &quot;locked&quot; so there is no
        &quot;holding and waiting&quot;. We need to take that into account in the lock-free logic. A second thread can
        modify the shared memory while the first is still needing it, and due to it&apos;s logic, it&apos;s expecting to
        find the original value. We need to handle this problem, and that&apos;s where <mark>
          compare_exchange
        </mark>{" "}
        comes in handy. It compares the current shared value to the expected one, on success, the current variable is
        updated with the value. Together with a classic <mark>if</mark> statement it becomes a powerful tool.
        <br />
        <br />
        Also <mark>compare_exchange</mark> involves locking, although here we&apos;re packing more instructions in a
        single function:
      </p>
      <div className="my-4 md:flex overflow-scroll rounded-md bg-code">
        <div className="p-4">
          <Code
            lang="asm"
            lineNumbers={false}
            code={`// compare_exchange
cas:
        mov     edx, 1
        lea     rcx, [rsp - 16]
.LBB0_1:
        mov     rax, qword ptr [rdi]
        xor     esi, esi
        lock            cmpxchg qword ptr [rdi], rdx
        lea     r8, [rdx + 1]
        setne   sil
        mov     qword ptr [rsp - 16], rsi
        mov     qword ptr [rsp - 8], rax
        mov     rdx, r8
        cmp     r8, 10000000
        jne     .LBB0_1
        ret`}
          ></Code>
        </div>
      </div>
      <p>
        <mark>cmpxchg</mark> is the actual CAS operation but the other instructions are a necessary part of the whole
        compare exchange logic as well. I won&apos;t go into details here, there are good documents online that explain
        the logic. From our perspective, it seems reasonable that the CAS operation involves a performance degradation
        but in exchange we get the possibility to write logically sound, multithreaded and lock-free algorithms.
        <br />
        <br />
      </p>
      <h2 className="mb-4"> Conclusion </h2>
      <p>
        Lock-free algorithms are very interesting. I&apos;m promising myself to write a part 2 where I show the logic of
        the FIFO queue I&apos;m working on.
      </p>
    </article>
  );
}

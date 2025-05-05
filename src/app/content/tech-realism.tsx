import Image from "next/image";

const IMG_PREFIX = process.env.NODE_ENV == "production" ? "/interfaces_blog" : "";

export default function Article() {
  return (
    <article>
      <div className="w-full h-60 mb-10 rounded-md relative">
        <Image
          src={`${IMG_PREFIX}` + `/gradient3.jpg`}
          alt={"alt"}
          style={{ borderRadius: "6px", objectFit: "cover" }}
          fill
        />
        <h1 className="px-2 m-2 absolute bottom-0 bg-background rounded-md">Technological Hyper Realism</h1>
      </div>
      <p>
        We don&apos;t exactly live in a technological era. In fact, how could you tell we do? The answer is probably
        &quot;
        <em>it&apos;s what people say</em> &quot;. It&apos;s part of the common imaginary that we all have, reinforced
        by the stream of futuristic visions in the media, sanitized images of innovation and suggestive product
        annoucements.
        <br />
        <br />
        Then tech becomes what people talk about. And people talk about it because <em>it feels good</em>. We get
        extreme product variety, anxiety-soothing endless scrolling, attention-capturing recommendation systems,
        addictive notifications. After many iterations, technology acquires a self-justified meaning that is more
        present to us, more common and more authoritative than the traditional reality. The new reality is more than
        real, it&apos;s{" "}
        <a
          href="https://en.wikipedia.org/wiki/Simulacra_and_Simulation"
          className="underline"
          rel="nofollow"
          target="_blank"
        >
          <em>hyper-real</em>
        </a>
        . The second feature of the new reality is that it&apos;s not just a concealment of the traditional reality, but
        a self-sustained understanding of the world that is not attached to anything real, it is <em>something</em> in
        and of itself, a <em>simulacrum</em>. A{" "}
        <a
          href="https://en.wikipedia.org/wiki/Simulacra_and_Simulation#Definition"
          className="underline"
          rel="nofollow"
          target="_blank"
        >
          quote
        </a>{" "}
        from M. Poster and J. Baudrillard:
      </p>

      <blockquote className="flex space-x-4">
        <span className="text-4xl">&#10077;</span>
        <div className="mt-4">
          ...The simulacrum is never that which conceals the truth—it is the truth which conceals that there is none.
          The simulacrum is true.
        </div>
      </blockquote>

      <p>
        In other words, the simulacrum is the truth that conceals that there is no{" "}
        <a
          href="https://plato.stanford.edu/entries/truth-correspondence/"
          className="underline"
          rel="nofollow"
          target="_blank"
        >
          <em>truth</em>
        </a>{" "}
        or correspondence with what&apos;s real.
        <br />
        <br />
        In my view, there are two factors that lead to this stage: the effect on the individual, the personal factor,
        and the communication of this new found &quot;meaning&quot;, the social factor. The first, I think, it&apos;s a
        necessary precondition for the second and for the emergence of the hyper-real.
        <br />
        <br />
        Without the personal factor, there wouldn&apos;t be the possibility for the individual to intuitively (and
        perhaps subconsciously) step into the hyper real. A moment should be spent in understanding how technology has
        become capable of hijacking our limbic system. The emotional component is important. The psychological levers
        pulled by of recommendation systems, the visual stimuli and notifications are also important.
        <br />
        <br />
        The social factor is largely overlapping with the personal one, since, interacting with others is large part of
        what we do and contributes to our understanding of the world. I can think that, in the hypothetical scenario of
        total isolation, much of what we discussed wouldn&apos;t make sense.
        <br />
        <br />
        New difficult questions arise. <em>Can we really talk about progress?</em> What is the ethics of this new world?
        How do we approach the idea of making history?
        <br />
        <br />
      </p>
      <h2 className="mb-4">Conclusion</h2>
      <p>
        I want to conclude with a quote from <em>The Burnout Society</em> by Byung-Chul Han:
      </p>
      <blockquote className="flex space-x-4">
        <span className="text-4xl">&#10077;</span>
        <div className="mt-4">
          In this society of compulsion, everyone carries a work camp inside. This labor camp is defined by the fact
          that one is simultaneously prisoner and guard, victim and perpetrator. One exploits oneself. It means that
          exploitation is possible even without domination.
        </div>
      </blockquote>
      <p>
        Is this the new table of values we&apos;re moving towards? Are we getting ourselves in a techno-utopian prison?
        Perhaps we need to take an antidote to the hyper-real. A strong narrative of our time is that technology is
        inherently progressive or liberating, while it has essentially no downsides: the consequences on well-being, the
        ethical traps, and the unforeseen consequences, the confusion about what&apos;s valuable.
      </p>
    </article>
  );
}

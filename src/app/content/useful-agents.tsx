import Image from "next/image";

const IMG_PREFIX = process.env.NODE_ENV == "production" ? "/interfaces_blog" : "";

export default function Article() {
  return (
    <article>
      <div className="w-full h-60 mb-10 rounded-md relative">
        <Image
          src={`${IMG_PREFIX}` + `/gradient1.jpg`}
          alt={"alt"}
          style={{ borderRadius: "6px", objectFit: "cover" }}
          fill
        />
        <h1 className="px-2 m-2 absolute bottom-0 bg-background rounded-md">Are AI Agents going to replace us?</h1>
      </div>
      <p>
        It&apos;s early 2025 and AI is a big deal. AI Agents are the new trend and a big one too, actually they have
        been for a year at least. Rivers of ink (or bytes) have been poured to answer the question &apos;Will AI replace
        us?&apos; Todd McKinnon, Okta&apos;s CEO,{" "}
        <a
          href="https://www.entrepreneur.com/business-news/okta-ceo-ai-will-lead-to-more-software-engineers-not-less/489732"
          className="underline"
          rel="nofollow"
          target="_blank"
        >
          <em>says &quot;It&apos;s laughable&quot;</em>
        </a>{" "}
        that AI is going to replace software engineers.
        <br />
        <br />
        What&apos;s an AI Agent you ask? My friend, don&apos;t let people hear you asking this question. Especially if
        you work in tech. Clearly, you want to be part of the group of cool people right?
        <br />
        <br />
        But <em>seriously</em>, what are AI Agents? Let&apos;s take a look at the 1.4M views video{" "}
        <a href="https://www.youtube.com/watch?v=F8NKVhkZZWI" className="underline" rel="nofollow" target="_blank">
          <em>What are AI Agents?</em>
        </a>
        &quot; from the IBM Technology YouTube channel. First of all, tt tells us that they are more than just language
        models. In fact:
      </p>
      <blockquote className="flex space-x-4">
        <span className="text-4xl">&#10077;</span>
        <div className="mt-4">
          ...the magic gets unlocked when I start building systems around the model and integrate them into the existing
          process I have.
        </div>
      </blockquote>
      <p>
        Some of you working in tech may already have caught the irony that&apos;s between the advertised results and the
        reality of production grade technology. I hear promises of magic — but what I understand is that I need to
        program (or buy), connect and configure tools to support AI — which already has a cost and security implications
        on its own. Complexity is no joke. I&apos;m starting to think Todd was right.
        <br />
        <br />
        In the{" "}
        <a href="https://2025.stateofai.dev/en-US/" className="underline" rel="nofollow" target="_blank">
          <em>state of web dev AI 2025</em>
        </a>{" "}
        report, 4000+ developers participated in giving their opinion on AI and how they use it to do real work. We read
        that ~70% of developers use AI coding tools weekly, but 76% of them refactor at least <em>half</em> of the
        generated code. Here&apos;s a quote from a developer:
      </p>
      <blockquote className="flex space-x-4">
        <span className="text-4xl">&#10077;</span>
        <div className="mt-4">
          All AI code generation I&apos;ve tried generates a big pile of unmaintainable and non-testable code...
        </div>
      </blockquote>
      <p>
        It seems difficult to accept that humans will become &quot;obsolete&quot; just because we have a greater
        capacity to build systems of increasing complexity. There are many theses out there that lean on this side of
        the argument to varying degrees. I&apos;m going to briefly mentiont a few ideas of general character, perhaps
        less represented in the mainstream media.
        <br />
        <br />
        Concerning the general idea of <em>human beings being left behind</em> by AI. First the historical viewpoint
        must be mentioned: human beings have always created more and more complex systems. It&apos; seems to be a
        natural tedency of our species. One could say, it&apos;s a statement made by nature itself. It&apos;s difficult
        to accept without reservations that AI can undo this mechanism. This isn&apos;t just an historical view. In fact
        those that want to be consistent with the scientific process would have to agree. Science looks, interprets and
        codifies the regularities of the universe. AI replacing human beings seems to contradict the regularity
        mentioned above, that human beings are still here despite all the complexity and more or less catastrophic
        failures of our endeavors. Certainly such technologies have the power to create real shocks.{" "}
        <em>
          (edit:I&apos;ve written more about it in the article on&ensp;
          <a
            href="https://gabrielecodes.github.io/interfaces_blog/blog/tech-realism"
            className="underline"
            rel="nofollow"
            target="_blank"
          >
            Technological Hyper Realism
          </a>
        </em>
        .)
        <br />
        <br />
        The second consideration regards the inability — or perhaps impossibility — of AI to make statements that are{" "}
        <a
          href="https://www.oxfordreference.com/display/10.1093/oi/authority.20110803105953845"
          className="underline"
          rel="nofollow"
          target="_blank"
        >
          <em>truth apt</em>
        </a>
        . I&apos;ll just briefly mention two ideas. First, I doubt one can refer to AI responses as
        &quot;statements&quot; or &quot;propositions&quot; as if one would with a human being. Then, there is also the
        problem of determining if such responses can be evaluated as <em>truth statements</em>. The probabilistic nature
        of the model and the variety of the generated responses, has nothing to do with the possibility of the responses
        being &quot;true&quot; or &quot;false&quot; as in a human made statement. Those responses don&apos;t imply
        anything like free will or doubt, neither fallibility. How would one define such concepts in the case of an
        algorithm? It seems to me that the process beind the formation of AI reponses is not at all on equal footing
        with what happens in a human mind. AI is still just an algorithm that follows rules. Although it&apos;s
        understandable why one may equate the two.
        <br />
        <br />
        There are more practical problems with the current idea of AI Agents. The video goes more into detail:
      </p>
      <blockquote className="flex space-x-4">
        <span className="text-4xl">&#10077;</span>
        <div className="mt-4">
          ... also I have programmatic components that can come around it [the AI model
          <span className="text-xs"> (author&apos;s note)</span>]. So I can have output verifiers. I can have programs
          that can take a query and then break it down to increase the chances of the answer being correct.
        </div>
      </blockquote>
      <p>
        After building and configuring we have to deal with the errors or allucinations of AI. Perhaps we&apos;ll need
        to meddle with syntax trees to prevent AI&apos;s mistakes. Or simply AI can be <em>confidently</em> wrong and we
        don&apos;t even notice. Our system fails silently.
        <br />
        <br />
        Another quote from the video:
      </p>
      <blockquote className="flex space-x-4">
        <span className="text-4xl">&#10077;</span>
        <div className="mt-4">
          Another capability of agents is the ability to act. And this is done by external programs known in the
          industry as tools. So tools are external pieces of the program and the model can define when to call them and
          how to call them.
        </div>
      </blockquote>
      <p>
        We have a model that can <em>reason</em> about the problem it has to solve, decomposing it into parts and tools,
        together with the ability to <em>act</em>, that is, the ability to use those tools.
        <br />
        <br />
        Our AI Agent is starting to look like a good old <em>cronjob</em> with many potential issues, the main one being
        caused by the very probabilistic nature of LLM models: they are &quot;programmed&quot; with{" "}
        <em>natural language</em>, which is ambiguous and inefficient. Not only it looks like I need serious programming
        if I want a very powerful Agent (the tools, the databases, the checks, the CI, the security, etc.) but I also
        introduce randomness in my process with a tool that I do not fully control.
        <br />
        <br />
      </p>
      <h2 className="mb-4">Conclusion</h2>
      <p>
        AI Agents are fine. I like AI, it&apos;s fun and it can be useful for many tasks,{" "}
        <em>but it&apos;s not for free</em>. I couldn&apos;t help but notice the irony of it though, and of the whole
        &quot;AI magic does everything effortlessly&quot; narrative. Hopefully AI is not going to take our jobs, our
        drive to do and discover something more and our satisfaction for a job well done.
      </p>
    </article>
  );
}

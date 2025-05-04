export default function Page() {
  return (
    <div>
      <h1 className="my-4">Social</h1>
      Find me on{" "}
      <a href="https://www.linkedin.com/in/gabriele-costanza/" className="underline" rel={"nofollow"} target="_blank">
        LinkedIn
      </a>
      <h1 className="my-4 mt-6">CV</h1>
      <ul className="list-disc my-2 space-y-4">
        <li className="ml-8">
          <div className="flex justify-between">
            <span>Automation Manager</span>
            <span className="text-textcolor">Apr 2024 - Present</span>
          </div>
          <div className="text-textcolor">Data Engineering, Analytics, Infrastructure</div>
        </li>
        <li className="ml-8">
          <div className="flex justify-between">
            <span>Senior Data Engineer</span>
            <span className="text-textcolor">Feb 2023 - Mar 2024</span>
          </div>
          <div className="text-textcolor">Data Engineering, Analytics, Infrastructure</div>
        </li>
        <li className="ml-8">
          <div className="flex justify-between">
            <span>Senior Data Engineer & Senior Data Analyst </span>
            <span className="text-textcolor">Jun 2020 - Feb 2023</span>
          </div>
          <div className="text-textcolor">Data Engineering, Analytics, Infrastructure</div>
        </li>
        <li className="ml-8">
          <div className="flex justify-between">
            <span>Credit Risk Analyst </span>
            <span className="text-textcolor">Feb 2019 - Jun 2020</span>
          </div>
          <div className="text-textcolor">Credit Risk Analyst</div>
        </li>
        <li className="ml-8">
          <div className="flex justify-between">
            <span>Data Scientist </span>
            <span className="text-textcolor">Oct 2017 - Jan 2019</span>
          </div>
          <div className="text-textcolor">Data Scientist & ML Eng.</div>
        </li>
      </ul>
    </div>
  );
}

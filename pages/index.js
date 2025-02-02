import { useRef, useState } from "react";
import Header from "../components/Header";
import ServiceCard from "../components/ServiceCard";
import Socials from "../components/Socials";
import WorkCard from "../components/WorkCard";
import { useIsomorphicLayoutEffect } from "../utils";
import { stagger } from "../animations";
import Footer from "../components/Footer";
import Head from "next/head";
import Button from "../components/Button";
import Link from "next/link";
import Cursor from "../components/Cursor";
import ProjectDetailsModal from "../components/ProjectDetailsModal"; 

// Local Data
import data from "../data/portfolio.json";

export default function Home() {
  // Ref
  const workRef = useRef();
  const aboutRef = useRef();
  const textOne = useRef();
  const textTwo = useRef();
  const textThree = useRef();
  const textFour = useRef();

  const [selectedProject, setSelectedProject] = useState(null); 

  const handleModalShow = (project) => {
    setSelectedProject(project);  // Show selected project details
  };

  const handleModalClose = () => {
    setSelectedProject(null);  // Close the modal
  };

  // Handling Scroll
  const handleWorkScroll = () => {
    window.scrollTo({
      top: workRef.current.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };

  const handleAboutScroll = () => {
    window.scrollTo({
      top: aboutRef.current.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };

  useIsomorphicLayoutEffect(() => {
    stagger(
      [textOne.current, textTwo.current, textThree.current, textFour.current],
      { y: 40, x: -10, transform: "scale(0.95) skew(10deg)" },
      { y: 0, x: 0, transform: "scale(1)" }
    );
  }, []);

  return (
    <div className={`relative ${data.showCursor && "cursor-none"}`}>
      {data.showCursor && <Cursor />}
      <Head>
        <title>{data.name}</title>
      </Head>

      <div className="gradient-circle"></div>
      <div className="gradient-circle-bottom"></div>

      <div className="container mx-auto mb-10">
        <Header
          handleWorkScroll={handleWorkScroll}
          handleAboutScroll={handleAboutScroll}
        />
        <div className="laptop:mt-20 mt-10">
          <div className="mt-5">
            <h1
              ref={textOne}
              className="text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl p-1 tablet:p-2 text-bold w-4/5 mob:w-full laptop:w-4/5"
            >
              {data.headerTaglineOne}
            </h1>
            <h1
              ref={textTwo}
              className="text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl p-1 tablet:p-2 text-bold w-full laptop:w-4/5"
              style={{fontSize:"40px"}}
            >
              {data.headerTaglineTwo}
            </h1>
            <h1
              ref={textThree}
              className="text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl p-1 tablet:p-2 text-bold w-full laptop:w-4/5"
              style={{fontSize:"30px"}}
            >
              {data.headerTaglineThree}
            </h1>
            <h1
              ref={textFour}
              className="text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl p-1 tablet:p-2 text-bold w-full laptop:w-4/5"
              style={{fontSize:"30px"}}
            >
              {data.headerTaglineFour}
            </h1>
          </div>

          <Socials className="mt-2 laptop:mt-5" />
        </div>
        <div id="work" className="mt-10 laptop:mt-30 p-2 laptop:p-0" ref={workRef}>
          <h1 className="text-2xl text-bold">Projects.</h1>

          <div className="mt-5 laptop:mt-10 grid grid-cols-1 laptop:grid-cols-2 gap-4">
            {data.projects.map((project) => (
              <WorkCard
                key={project.id}
                img={project.images[0]}
                name={project.title}
                description={project.description}
                onClick={() => handleModalShow(project)}
                project={project}
              />
            ))}
          </div>
        </div>

        {process.env.NODE_ENV === "development" && (
          <div className="fixed bottom-5 right-5">
            <Link href="/edit">
              <Button type="primary">Edit Data</Button>
            </Link>
          </div>
        )}

        <div id="about" className="mt-10 laptop:mt-40 p-2 laptop:p-0" ref={aboutRef}>
          <h1 className="tablet:m-10 text-2xl text-bold">About.</h1>
          <div className="flex flex-col laptop:flex-row items-center laptop:items-start mt-5 laptop:mt-10">
            <img 
              src="https://github.com/PIC123/react-portfolio-template/blob/master/src/images/self.jpg?raw=true" 
              alt="about" 
              className="w-full max-w-xs mb-5 laptop:mb-0 laptop:mr-10 rounded-lg"
            />
            <div className="laptop:w-3/5">
              <p className="text-xl laptop:text-3xl">{data.aboutParaOne}</p>
              <p className="text-xl laptop:text-3xl mt-5">{data.aboutParaTwo}</p>
              <p className="text-xl laptop:text-3xl mt-5">{data.aboutParaThree}</p>
            </div>
          </div>
        </div>

        <div className="mt-10 laptop:mt-30 p-2 laptop:p-0">
          <h1 className="tablet:m-10 text-2xl text-bold">Skills.</h1>
          <div className="mt-5 tablet:m-10 grid grid-cols-3 gap-6">
            {data.skills.map((skill, index) => (
              <div key={index} className="flex flex-col items-center">
                <img src={skill.imgSrc} alt={skill.title} className="w-16 h-16" />
                <p className="mt-2 text-center">{skill.title}</p>
              </div>
            ))}
          </div>
        </div>

        <Footer />
      </div>
      {selectedProject && (
        <ProjectDetailsModal
          show={true}
          onHide={handleModalClose}
          data={selectedProject}
        />
      )}
    </div>
  );
}
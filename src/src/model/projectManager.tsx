import MediaManager from "./mediaManager";
import { useEffect, useState } from "react";
import { Project } from "./types";

const ProjectManager: React.FC<{ selectedComponent: string }> = ({ selectedComponent }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProject, setCurrentProject] = useState<number>(0);
  const [projectUser, setProjectUser] = useState<string>("");
  const [projectId, setProjectId] = useState<string>("");
  const [projectName, setProjectName] = useState<string>("");
  const [projectWidth, setProjectWidth] = useState<number>(1920);
  const [projectHeight, setProjectHeight] = useState<number>(1080);
  const [projectFramerate, setProjectFramerate] = useState<number>(30);
  const [projectDuration, setProjectDuration] = useState<number>(0);

  useEffect(() => {
    if (currentProject >= projects.length) return;
    setProjectId(projects[currentProject]._id);
    setProjectName(projects[currentProject].name);
    setProjectWidth(projects[currentProject].width);
    setProjectHeight(projects[currentProject].height);
    setProjectFramerate(projects[currentProject].framerate);
    setProjectDuration(projects[currentProject].duration);
  }, [currentProject, projects]);

  // Simulating user login with hardcoded email
  useEffect(() => {
    const hardcodedEmail = "example@example.com";
    setProjectUser(hardcodedEmail);
  }, []);

  // Simulating fetching projects without backend connection
  useEffect(() => {
    if (projectUser === "") return;
    // Provide hardcoded projects
    const hardcodedProjects: Project[] = [
      {
        _id: "1",
        name: "Project 1",
        width: 1920,
        height: 1080,
        framerate: 30,
        duration: 60,
      },
      {
        _id: "2",
        name: "Project 2",
        width: 1280,
        height: 720,
        framerate: 24,
        duration: 120,
      },
    ];
    setProjects(hardcodedProjects);
  }, [projectUser]);

  return (
    <MediaManager
      projectUser={projectUser}
      setProjectUser={setProjectUser}
      projectHeight={projectHeight}
      setProjectHeight={setProjectHeight}
      projectWidth={projectWidth}
      setProjectWidth={setProjectWidth}
      projectFramerate={projectFramerate}
      setProjectFramerate={setProjectFramerate}
      projectName={projectName}
      setProjectName={setProjectName}
      projectId={projectId}
      setProjectId={setProjectId}
      projectDuration={projectDuration}
      setProjectDuration={setProjectDuration}
      projects={projects}
      setProjects={setProjects}
      selectedComponent={selectedComponent}
                  // selectedComponent="hello"

    />
  );
}
export default ProjectManager;

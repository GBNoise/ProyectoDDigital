const icons = [
  {
    name: "Home",
    icon: `<svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-house"
          viewBox="0 0 16 16"
        >
          <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5ZM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5 5 5Z" />
        </svg>`,
    to: "/",
  },
];

const createNav = () => {
  const nav = document.createElement("nav");
  const ul = document.createElement("ul");

  icons.forEach(({ name, icon, to }) => {
    const li = document.createElement("li");
    const link = document.createElement("a");
    link.href = to;
    const title = document.createElement("p");
    // title.innerHTML = `${name}`;
    link.append(title);
    link.innerHTML += icon;
    li.append(link);
    ul.append(li);
  });
  nav.append(ul);

  return nav;
};

const pjIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-circle" viewBox="0 0 16 16">
    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
  </svg>`;

const projectsMock = [
  {
    ProyectoID: 1,
    Nombre: "Frontend Sandals",
    Fecha_inicio: "20/02/23",
    Fecha_prev_final: null,
    Estado: "progreso",
  },
  {
    ProyectoID: 1,
    Nombre: "Frontend Sandals",
    Fecha_inicio: "20/02/23",
    Fecha_prev_final: null,
    Estado: "progreso",
  },
  {
    ProyectoID: 1,
    Nombre: "Frontend Sandals",
    Fecha_inicio: "20/02/23",
    Fecha_prev_final: null,
    Estado: "progreso",
  },
  {
    ProyectoID: 1,
    Nombre: "Frontend Sandals",
    Fecha_inicio: "20/02/23",
    Fecha_prev_final: null,
    Estado: "progreso",
  },
];

const createSidebar = () => {
  const div = document.createElement("div");
  div.className = "sidebar";
  const title = document.createElement("h2");
  title.innerText = "Projects";

  div.append(title);

  const ul = document.createElement("ul");
  ul.className = "projects-list";
  projectsMock.forEach(
    ({ ProyectoID, Nombre, Fecha_inicio, Fecha_prev_final, Estado }) => {
      const li = document.createElement("li");
      const link = document.createElement("a");
      link.style.display = "flex";
      link.href = `/project/${ProyectoID}`;
      link.innerHTML += `${pjIcon} <p>${Nombre}</p>`;
      li.append(link);
      ul.append(li);
    }
  );

  div.append(ul);

  return div;
};

const createTask = () => {
  const div = document.createElement("div");
  div.className = "single-task";
  return div;
};

const createTasksContainer = (title) => {
  const div = document.createElement("div");
  div.className = "task-container";
  const h2 = document.createElement("h2");
  h2.innerText = title;
  div.append(h2);
  return div;
};

const taskstatus = ["Todo", "On Progress", "Done"];

const createViewRender = () => {
  const div = document.createElement("div");
  div.className = "render-view";

  const titleContainer = document.createElement("div");
  const titleContainerTitle = document.createElement("h2");
  titleContainerTitle.innerText += "ProjectName";
  titleContainer.append(titleContainerTitle);
  titleContainer.className = "title-container";
  div.append(titleContainer);

  const innerTasks = document.createElement("div");
  innerTasks.className = "inner-tasks";

  taskstatus.forEach((title) => {
    const taskcontainer = createTasksContainer(title);
    taskcontainer.append(createTask());
    innerTasks.append(taskcontainer);
  });

  div.append(innerTasks);

  return div;
};

const nav = createNav();
const sidebar = createSidebar();
const view = createViewRender();
document.body.appendChild(nav);
document.body.appendChild(sidebar);
document.body.appendChild(view);

const useState = (val) => {
  return {
    val,
    get() {
      return this.val;
    },
    set(newVal, fn) {
      this.val = newVal;
      if (fn) fn(this.val);
    },
  };
};

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
    ProyectoID: 2,
    Nombre: "Frontend Sandals 2",
    Fecha_inicio: "20/02/23",
    Fecha_prev_final: null,
    Estado: "progreso",
  },
  {
    ProyectoID: 3,
    Nombre: "Frontend Sandals 3",
    Fecha_inicio: "20/02/23",
    Fecha_prev_final: null,
    Estado: "progreso",
  },
  {
    ProyectoID: 4,
    Nombre: "Frontend Sandals 4",
    Fecha_inicio: "20/02/23",
    Fecha_prev_final: null,
    Estado: "progreso",
  },
];

const tareas = {
  1: [
    {
      TareaID: 1,
      Nombre: "Implement random",
      descripcion: "una desc random",
      Fecha_Inicio: "01/01/23",
      Fecha_prev_Final: "01/03/23",
      Estado: "On Progress",
      Prioridad: "maxima",
      ProyectoID: 1,
      Miembro_equipoID: 1,
    },
    {
      TareaID: 1,
      Nombre: "Implement random",
      descripcion: "una desc random",
      Fecha_Inicio: "01/01/23",
      Fecha_prev_Final: "01/03/23",
      Estado: "Todo",
      Prioridad: "maxima",
      ProyectoID: 1,
      Miembro_equipoID: 1,
    },
  ],
  2: [
    {
      TareaID: 1,
      Nombre: "Implement random",
      descripcion: "una desc random",
      Fecha_Inicio: "01/01/23",
      Fecha_prev_Final: "01/03/23",
      Estado: "On Progress",
      Prioridad: "maxima",
      ProyectoID: 1,
      Miembro_equipoID: 1,
    },
    {
      TareaID: 1,
      Nombre: "Implement random",
      descripcion: "una desc random",
      Fecha_Inicio: "01/01/23",
      Fecha_prev_Final: "01/03/23",
      Estado: "On Progress",
      Prioridad: "maxima",
      ProyectoID: 1,
      Miembro_equipoID: 1,
    },
  ],
  3: [
    {
      TareaID: 1,
      Nombre: "Implement random",
      descripcion: "una desc random",
      Fecha_Inicio: "01/01/23",
      Fecha_prev_Final: "01/03/23",
      Estado: "Todo",
      Prioridad: "maxima",
      ProyectoID: 1,
      Miembro_equipoID: 1,
    },
    {
      TareaID: 1,
      Nombre: "Implement random",
      descripcion: "una desc random",
      Fecha_Inicio: "01/01/23",
      Fecha_prev_Final: "01/03/23",
      Estado: "Todo",
      Prioridad: "maxima",
      ProyectoID: 1,
      Miembro_equipoID: 1,
    },
  ],
  4: [
    {
      TareaID: 1,
      Nombre: "Implement random",
      descripcion: "una desc random",
      Fecha_Inicio: "01/01/23",
      Fecha_prev_Final: "01/03/23",
      Estado: "Todo",
      Prioridad: "maxima",
      ProyectoID: 1,
      Miembro_equipoID: 1,
    },
    {
      TareaID: 1,
      Nombre: "Implement random",
      descripcion: "una desc random",
      Fecha_Inicio: "01/01/23",
      Fecha_prev_Final: "01/03/23",
      Estado: "Done",
      Prioridad: "maxima",
      ProyectoID: 1,
      Miembro_equipoID: 1,
    },
  ],
};

const currentProject = useState(projectsMock[0]);
const currentTasks = useState(tareas[currentProject.get()["ProyectoID"]]);
const taskstatus = ["Todo", "On Progress", "Done"];
const isModalOpen = useState(false);
const createTaskFields = useState({
  "Task Name": "",
  "Task Description": "",
  "Initial Date": null,
  "End Date": null,
  Status: "",
});

const createSidebar = () => {
  const div = document.createElement("div");
  div.className = "sidebar";
  const title = document.createElement("h2");
  title.innerText = "Projects";

  div.append(title);

  const ul = document.createElement("ul");
  ul.className = "projects-list";
  projectsMock.forEach((project) => {
    const { ProyectoID, Nombre, Fecha_inicio, Fecha_prev_final, Estado } =
      project;
    const li = document.createElement("li");
    const link = document.createElement("a");
    link.style.display = "flex";
    // link.href = `/project/${ProyectoID}`;
    link.innerHTML += `${pjIcon} <p>${Nombre}</p>`;
    li.append(link);
    const setProject = (newVal) => {
      let titleContainer = document.querySelector(".title-container-h2");
      if (!titleContainer) return;
      titleContainer.innerHTML = newVal.Nombre;
    };

    // TODO: Tasks have to be correctly set after change

    const setTasks = () => {
      let render = document.querySelector(".render-view");
      render.remove();
      render = createViewRender();
      document.body.append(render);
    };

    li.addEventListener("click", (e) => {
      currentProject.set(project, setProject);
      currentTasks.set(tareas[currentProject.get()["ProyectoID"]], setTasks);
    });
    ul.append(li);
  });

  div.append(ul);

  return div;
};

const createTask = (task) => {
  const {
    TareaID,
    Nombre,
    descripcion,
    Fecha_Inicio,
    Fecha_prev_Final,
    Estado,
    Prioridad,
    ProyectoID,
    Miembro_equipoID,
  } = task;
  const div = document.createElement("div");
  div.className = "single-task";
  div.draggable = true;

  const title = document.createElement("h2");
  title.className = "single-task-h2";
  title.innerText = Nombre;

  div.append(title);

  return div;
};

const onMouseOverTasksContainer = (e) => {
  e.stopPropagation();
};

const onMouseLeaveTasksContainer = (e) => {
  e.stopPropagation();
};

const createTasksContainer = (title) => {
  const div = document.createElement("div");
  div.className = `task-container task-container-${title}`;
  const h2 = document.createElement("h2");
  h2.innerText = title;
  h2.className = `task-container-h2-${title}`;
  div.append(h2);
  div.addEventListener("mouseover", onMouseOverTasksContainer);
  div.addEventListener("mouseleave", onMouseLeaveTasksContainer);
  return div;
};

const handleCreateTaskClick = (e) => {
  e.stopPropagation();
  let modal = document.querySelector(".modal");
  if (modal !== null) {
    modal.remove();
    return;
  }

  modal = createModal("Create Task");
  document.body.appendChild(modal);
  isModalOpen.set(!isModalOpen.get(), handleCreateTaskClick);
};

const createViewRender = () => {
  const div = document.createElement("div");
  div.className = "render-view";

  const titleContainer = document.createElement("div");
  const titleContainerTitle = document.createElement("h2");
  titleContainerTitle.className = "title-container-h2";
  titleContainerTitle.innerText += currentProject.get().Nombre;
  titleContainer.append(titleContainerTitle);
  titleContainer.className = "title-container";
  const createTaskBtn = document.createElement("button");
  createTaskBtn.innerText = "Create Task";
  createTaskBtn.addEventListener("click", handleCreateTaskClick);
  titleContainer.append(createTaskBtn);
  div.append(titleContainer);

  const innerTasks = document.createElement("div");
  innerTasks.className = "inner-tasks";

  taskstatus.forEach((title) => {
    const taskcontainer = createTasksContainer(title);
    currentTasks.get().forEach((task) => {
      if (task.Estado === title) {
        taskcontainer.append(createTask(task));
      }
    });
    innerTasks.append(taskcontainer);
  });

  div.append(innerTasks);

  return div;
};

const handleTasksInputChange = (e) => {
  const name = e.target.name;
  const value = e.target.value;
  let prevVal = createTaskFields.get();
  prevVal = { ...prevVal, [name]: value };
  createTaskFields.set(prevVal);
};

const createFormInput = (
  title,
  type = "text",
  element = null,
  dataType = "tasks"
) => {
  const label = document.createElement("label");
  label.for = "form-input";
  label.className = "form-label";
  label.innerText += title + ": ";

  let formInput = element;
  if (!element) {
    formInput = document.createElement("input");
  }

  formInput.className = "form-input";
  formInput.id = "form-input";
  formInput.type = type;
  formInput.name = title;

  formInput.addEventListener(
    "change",
    dataType === "tasks" ? handleTasksInputChange : () => alert("nothing")
  );

  label.append(formInput);
  return label;
};

const handleCreateTaskSubmit = (e) => {
  e.preventDefault();
};

const createModal = (title) => {
  const div = document.createElement("div");
  div.className = "modal";
  const innerDiv = document.createElement("form");
  innerDiv.className = "inner-modal";

  const innerTitle = document.createElement("h2");
  innerTitle.innerText = title || "";
  innerDiv.append(innerTitle);

  const name = createFormInput("Task Name");
  const description = createFormInput("Task Description");
  const initialDate = createFormInput("Initial Date", "Date");
  const endDate = createFormInput("End Date", "Date");
  const status = document.createElement("select");
  const statusTodo = document.createElement("option");
  statusTodo.innerText = taskstatus[0];
  const statusProgress = document.createElement("option");
  statusProgress.innerText = taskstatus[1];
  const statusDone = document.createElement("option");
  statusDone.innerText = taskstatus[2];

  status.append(statusTodo);
  status.append(statusProgress);
  status.append(statusDone);

  const createTaskBtn = document.createElement("button");
  createTaskBtn.innerText = "Create Task";
  createTaskBtn.addEventListener("click", handleCreateTaskSubmit);
  createTaskBtn.type = "submit";

  innerDiv.addEventListener("click", (e) => e.stopPropagation());
  div.addEventListener("click", handleCreateTaskClick);
  innerDiv.append(name);
  innerDiv.append(description);
  innerDiv.append(initialDate);
  innerDiv.append(endDate);
  innerDiv.append(createFormInput("Status", "", status));
  innerDiv.append(createTaskBtn);
  div.append(innerDiv);
  return div;
};

const nav = createNav();
const sidebar = createSidebar();
const view = createViewRender();
document.body.appendChild(nav);
document.body.appendChild(sidebar);
document.body.appendChild(view);

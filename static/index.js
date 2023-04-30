const baseURL = "https://proyectoddigital.onrender.com";

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

const getProjects = async () => {
  try {
    const response = await fetch(`${baseURL}/proyecto/proyecto.php`);
    const data = await response.json();
    return data;
  } catch (e) {
    console.log({ error: e });
  }
};

const getTareas = async () => {
  try {
    const response = await fetch(`${baseURL}/tarea/tarea.php`);
    const data = await response.json();
    return data;
  } catch (e) {
    console.log({ error: e });
  }
};

const getMiembros = async () => {
  try {
    const response = await fetch(baseURL + "/miembro_equipo/miembro.php");
    const data = await response.json();
    return data;
  } catch (e) {
    console.log({ error: e });
  }
};

const deleteTask = async (id) => {
  try {
    const response = await fetch(`${baseURL}/tarea/tarea.php?id=${id}`, {
      method: "DELETE",
    });
    window.location.reload();

    const rdata = await response.json();
  } catch (e) {
    console.log({ error: e });
  }
};

const deleteProject = async (id) => {
  try {
    const response = await fetch(`${baseURL}/proyecto/proyecto.php?id=${id}`, {
      method: "DELETE",
    });
    window.location.reload();

    const rdata = await response.json();
  } catch (e) {
    console.log({ error: e });
  }
};

const postTask = async (data) => {
  try {
    const postdata = {
      nombre: data["Task Name"],
      descripcion: data["Task Description"],
      proyecto: data["proyecto"],
      inicio: data["Initial Date"],
      final: data["End Date"],
      estado: data["Status"],
      miembroEquipo: data["Member"],
    };

    const response = await fetch(baseURL + "/tarea/tarea.php", {
      method: "POST",
      body: JSON.stringify(postdata),
    });
    window.location.reload();

    const rdata = await response.json();
  } catch (e) {
    console.log({ error: e });
  }
};

const postProject = async (data) => {
  try {
    const postdata = {
      nombre: data["Name"],
      inicio: data["Initial Date"],
      final: data["End Date"],
      estado: data["Status"],
    };
    const response = await fetch(baseURL + "/proyecto/proyecto.php", {
      method: "POST",
      body: JSON.stringify(postdata),
    });
    window.location.reload();

    const rdata = await response.json();
  } catch (e) {
    console.log({ error: e });
  }
};

const updateTask = async (id, status) => {
  try {
    const response = await fetch(
      baseURL + `/tarea/tarea.php?id=${id}&estado=${status}`
    );
    window.location.reload();
    const rdata = await response.json();
  } catch (e) {
    console.log({ error: e });
  }
};

const pjIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-circle" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
</svg>`;

// let projectsMock = useState([]);
let tareas = useState([]);
let miembros = useState([]);

getProjects().then((projectsMock) => {
  let currentProject = useState(projectsMock[0]);

  getTareas().then((tRes) => {
    tareas = tRes;
    let currentTasks = useState(tRes[projectsMock[0]["proyectoid"]]);

    getMiembros().then((mres) => {
      miembros = mres;

      const taskstatus = ["Todo", "On Progress", "Done"];
      const isModalOpen = useState(false);
      const createTaskFields = useState({
        "Task Name": "",
        "Task Description": "",
        "Initial Date": null,
        "End Date": null,
        proyecto: "",
        Status: "",
        Member: "",
      });

      const createProjectFields = useState({
        Name: "",
        "Initial Date": null,
        "End Date": null,
        Estado: "",
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
          const { proyectoid, nombre, fecha_inicio, fecha_prev_final, estado } =
            project;
          const li = document.createElement("li");
          const link = document.createElement("a");
          link.style.display = "flex";
          // link.href = `/project/${ProyectoID}`;
          link.innerHTML += `${pjIcon} <p>${nombre}</p>`;
          li.append(link);
          const setProject = (newVal) => {
            let titleContainer = document.querySelector(".title-container-h2");
            if (!titleContainer) return;
            titleContainer.innerHTML = newVal.nombre;
          };

          const setTasks = () => {
            let render = document.querySelector(".render-view");
            render.remove();
            render = createViewRender();
            document.body.append(render);
          };

          li.addEventListener("click", (e) => {
            currentProject.set(project, setProject);
            console.log(tareas);
            console.log(project["proyectoid"]);
            currentTasks.set(tareas[project["proyectoid"]], setTasks);
          });
          ul.append(li);
        });

        const createProjectBtn = document.createElement("button");
        createProjectBtn.innerText = "Create Project";
        createProjectBtn.addEventListener("click", handleCreateProjectClick);

        div.append(ul);
        div.append(createProjectBtn);
        return div;
      };

      const handleCreateProjectClick = (e) => {
        e.stopPropagation();
        let modal = document.querySelector(".modal");
        if (modal !== null) {
          modal.remove();
          return;
        }

        modal = createModal("Create Project");
        document.body.appendChild(modal);
        isModalOpen.set(!isModalOpen.get(), handleCreateProjectClick);
      };

      const handleDeleteProject = async (id) => {
        await deleteProject(id);
      };

      const handleTaskUpdate = async (id) => {
        const status = document.querySelector(`.status-select-${id}`).value;
        await updateTask(id, status);
      };

      const createTask = (task) => {
        const {
          TareaID,
          Nombre,
          descripcion,
          fecha_inicio,
          fecha_prev_final,
          estado,
          prioridad,
          proyectoid,
          miembro_equipoid,
        } = task;

        const div = document.createElement("div");
        div.className = "single-task";
        div.draggable = true;

        const title = document.createElement("h2");
        title.className = "single-task-h2";
        title.innerText = Nombre;

        const desc = document.createElement("p");
        desc.className = "single-task-p";
        desc.innerText = descripcion;

        const fechas = document.createElement("p");
        fechas.className = "single-task-p";
        fechas.innerText = `${fecha_inicio} - ${fecha_prev_final}`;

        const estadoP = document.createElement("p");
        estadoP.className = "single-task-p";
        estadoP.innerText = estado;

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.innerText = "X";
        deleteBtn.addEventListener("click", async () => {
          await deleteTask(TareaID);
        });

        const select = document.createElement("select");
        select.append(document.createElement("option"));
        taskstatus.forEach((status) => {
          const opt = document.createElement("option");
          opt.innerText = status;
          select.append(opt);
        });

        select.className = `status-select status-select-${TareaID}`;

        const updateBtn = document.createElement("button");

        updateBtn.innerText = "update";
        updateBtn.addEventListener("click", () => handleTaskUpdate(TareaID));
        updateBtn.className = "update-btn";

        div.append(title);
        div.append(desc);
        div.append(fechas);
        div.append(estado);
        div.append(deleteBtn);
        div.append(select);
        div.append(updateBtn);

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
        titleContainerTitle.innerText += currentProject.get().nombre;
        titleContainer.append(titleContainerTitle);
        titleContainer.className = "title-container";
        const createTaskBtn = document.createElement("button");
        createTaskBtn.innerText = "Create Task";
        createTaskBtn.addEventListener("click", handleCreateTaskClick);
        titleContainer.append(createTaskBtn);

        // const deleteProjectBtn = document.createElement("button");
        // deleteProjectBtn.className = 'delete-project-btn'
        // deleteProjectBtn.innerText = 'Delete Project';
        // deleteProjectBtn.addEventListener('click', () => handleDeleteProject(currentProject.get().proyectoid));
        // titleContainer.append(deleteProjectBtn);

        div.append(titleContainer);

        const innerTasks = document.createElement("div");
        innerTasks.className = "inner-tasks";

        taskstatus.forEach((title) => {
          const taskcontainer = createTasksContainer(title);
          if (currentTasks.get()) {
            currentTasks.get().forEach((task) => {
              if (task.estado === title || title.includes(task.estado)) {
                taskcontainer.append(createTask(task));
              }
            });
          }

          innerTasks.append(taskcontainer);
        });

        div.append(innerTasks);

        return div;
      };

      const handleTasksInputChange = (e) => {
        const name = e.target.name;
        let value = e.target.value;

        if (name === "Member") {
          const member = miembros.filter(
            ({ nombre, miembro_equipoid }) => nombre === value
          );
          value = member[0]["miembro_equipoid"];
        }

        let prevVal = createTaskFields.get();
        prevVal = {
          ...prevVal,
          proyecto: currentProject.get()["proyectoid"],
          [name]: value,
        };
        createTaskFields.set(prevVal);
      };

      const handleProjectInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        let prevVal = createProjectFields.get();
        prevVal = { ...prevVal, [name]: value };
        createProjectFields.set(prevVal);
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
          dataType === "tasks"
            ? handleTasksInputChange
            : handleProjectInputChange
        );

        label.append(formInput);
        return label;
      };

      const handleCreateTaskSubmit = async (e) => {
        e.preventDefault();
        await postTask(createTaskFields.get());
      };

      const handleCreateProjectSubmit = async (e) => {
        e.preventDefault();
        await postProject(createProjectFields.get());
      };

      const createModal = (title) => {
        const div = document.createElement("div");
        div.className = "modal";
        const innerDiv = document.createElement("form");
        innerDiv.className = "inner-modal";

        const innerTitle = document.createElement("h2");
        innerTitle.innerText = title || "";
        innerDiv.append(innerTitle);

        if (title === "Create Task") {
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

          status.append(document.createElement("option"));
          status.append(statusTodo);
          status.append(statusProgress);
          status.append(statusDone);

          const member = document.createElement("select");
          member.append(document.createElement("option"));
          miembros.forEach(({ miembro_equipoid, nombre, email, cargo }) => {
            let option = document.createElement("option");
            option.id = miembro_equipoid;
            option.innerText = nombre;
            member.append(option);
          });

          const createTaskBtn = document.createElement("button");
          createTaskBtn.innerText = "Create Task";
          createTaskBtn.addEventListener("click", handleCreateTaskSubmit);
          createTaskBtn.type = "submit";

          div.addEventListener("click", handleCreateTaskClick);
          innerDiv.append(name);
          innerDiv.append(description);
          innerDiv.append(initialDate);
          innerDiv.append(endDate);
          innerDiv.append(createFormInput("Status", "", status));
          innerDiv.append(createFormInput("Member", "", member));
          innerDiv.append(createTaskBtn);
        }

        if (title === "Create Project") {
          const name = createFormInput("Name", "", "", "projects");
          const inicio = createFormInput(
            "Initial Date",
            "date",
            "",
            "projects"
          );
          const final = createFormInput("End Date", "date", "", "projects");
          const status = createFormInput("Status", "", "", "projects");

          const createProjectBtn = document.createElement("button");
          createProjectBtn.innerText = "Create Project";
          createProjectBtn.addEventListener("click", handleCreateProjectSubmit);
          createProjectBtn.type = "submit";
          div.addEventListener("click", handleCreateProjectClick);
          innerDiv.append(name);
          innerDiv.append(inicio);
          innerDiv.append(final);
          innerDiv.append(status);
          innerDiv.append(createProjectBtn);
        }

        innerDiv.addEventListener("click", (e) => e.stopPropagation());
        div.append(innerDiv);
        return div;
      };

      const nav = createNav();
      const sidebar = createSidebar();
      const view = createViewRender();
      document.body.appendChild(nav);
      document.body.appendChild(sidebar);
      document.body.appendChild(view);
    });
  });
});

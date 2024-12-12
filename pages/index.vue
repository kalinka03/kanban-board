<template>
  <div class="wrapper">
    <Board />
    <TaskPopupTeleport
        :showPopup="showPopup"
        @update:showPopup="showPopup = $event"
        :task="taskToEdit"
        :statuses="statuses"
        :priority="taskPriority"
        @saveTask="saveTask"
    />

    <div class="task-board">
      <div class="task-column" v-for="status in statuses" :key="status">
        <h3>{{ status }}</h3>
        <DraggableTaskList
            :tasks="filteredTasks(status)"
            :status="status"
            @end="onDragEnd"
            @editTask="editTask"
            @deleteTask="deleteTask"
        />
        <button @click="openCreateTaskPopup(status)" class="btn-create-task">
          <i class="fas fa-plus"></i> Додати задачу
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useTasksStore } from "@/store/tasks";
import DraggableTaskList from "@/components/DraggableTaskList.vue";
import Board from '@/components/Board.vue';
export default {
  components: {
    DraggableTaskList,
    Board
  },
  setup() {
    const showPopup = ref(false);
    const tasksStore = useTasksStore();
    const tasks = ref([]);
    const taskToEdit = ref(null);
    const statuses = ["TODO", "In Progress", "Done"];
    const taskPriority = ref("Medium");

    onMounted(() => {
      tasksStore.loadTasks();
      tasks.value = tasksStore.tasks;
    });

    const filteredTasks = (status) =>
        tasks.value.filter((task) => task.status === status);

    const onDragEnd = (event) => {
      const newStatus = event.to.dataset.status;
      const taskId = Number(event.item.dataset.id);

      if (!newStatus || !taskId) return;

      const task = tasksStore.tasks.find((t) => t.id === taskId);

      if (task && task.status !== newStatus) {
        task.status = newStatus;
        tasksStore.updateTask(task);
      }
    };

    const saveTask = (updatedTask) => {
      if (updatedTask.id) {
        // Якщо є id, це редагування
        tasksStore.updateTask(updatedTask);
      } else {
        tasksStore.addTask(updatedTask);
      }
      tasks.value = tasksStore.tasks;
      showPopup.value = false;
    };

    const editTask = (task) => {
      taskToEdit.value = { ...task };
      taskPriority.value = task.priority || "Medium";
      showPopup.value = true;
    };
    const openCreateTaskPopup = () => {
      taskToEdit.value = { title: "", description: "", status: status || 'TODO' };
      showPopup.value = true;
    };

    const deleteTask = (taskId) => {
      tasksStore.deleteTask(taskId);
      tasks.value = tasksStore.tasks;
    };

    return {
      showPopup,
      tasks,
      taskToEdit,
      statuses,
      taskPriority,
      saveTask,
      editTask,
      deleteTask,
      filteredTasks,
      onDragEnd,
      openCreateTaskPopup,
    };
  },
};
</script>

<style scoped>
.btn-create-task {
  display: inline-flex;
  align-items: center;
  background-color: inherit;
  color: white;
  padding: 10px 20px;
  border-radius: 30px;
  border: none;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  margin-top: 16px;
}

.btn-create-task i {
  margin-right: 10px;
}

.btn-create-task:hover {
  background-color: #22272b;
}

.btn-create-task:active {
  background-color: #22272b;
}

.wrapper {
  -webkit-backdrop-filter: blur(6px);
  backdrop-filter: blur(6px);
  background: hsla(206, 13.7%, 10%, 0.9);
  height: 100%;
  min-height: 100vh;
}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.task-board {
  display: flex;
  gap: 16px;
  padding: 16px;
}

.task-column {
  height: 100%;
  border-radius: 8px;
  padding: 16px;
  background-color: #101204;
  color: #44546f;
  white-space: normal;
  scroll-margin: 8px;
  flex: 1;
}

.task-column h3 {
  text-align: center;
  display: block;
  z-index: 0;
  margin: 0 0 16px;
  padding: 6px 8px 6px 12px;
  overflow: hidden;
  background-color: transparent;
  font-size: 24px;
  font-weight: 600;
  line-height: 20px;
  white-space: normal;
  cursor: pointer;
  overflow-wrap: anywhere;
  color: #B6C2CF;
}


.task-item button {
  margin-left: 8px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.task-item button:hover {
  background-color: #0056b3;
}
</style>
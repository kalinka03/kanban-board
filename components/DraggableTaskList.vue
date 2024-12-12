<template>
  <div>
    <draggable
        :list="tasks"
        group="tasks"
        @end="onDragEnd"
        :data-status="status"
        item-key="id"
        class="task-list"
    >
      <template #item="{ element }">
        <div class="task-item" :data-id="element.id" @click="editTask(element)">
          <div class="task-item__priority" :class="getPriorityClass(element.priority)">
          </div>
          <div>{{ element.title }}</div>
          <button @click.stop="confirmDelete(element.id)" class="task-list__delete">
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
      </template>
    </draggable>

    <div v-if="isDeleteModalVisible" class="delete-modal-overlay">
      <div class="delete-modal">
        <p>Вы действительно хотите удалить задачу?</p>
        <div class="delete-modal__btn">
          <button @click="deleteTask(taskIdToDelete)" class="confirm-delete">Да</button>
          <button @click="cancelDelete" class="cancel-delete">Нет</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";

export default {
  name: "DraggableTaskList",
  components: { draggable },
  props: {
    tasks: {
      type: Array,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  emits: ["end", "editTask", "deleteTask"],
  data() {
    return {
      isDeleteModalVisible: false,
      taskIdToDelete: null,
    };
  },
  methods: {
    onDragEnd(event) {
      this.$emit("end", event);
    },
    editTask(task) {
      this.$emit("editTask", task);
    },

    confirmDelete(taskId) {
      this.taskIdToDelete = taskId;
      this.isDeleteModalVisible = true;
    },

    deleteTask(taskId) {
      this.$emit("deleteTask", taskId);
      this.isDeleteModalVisible = false;
      this.taskIdToDelete = null;
    },

    cancelDelete() {
      this.isDeleteModalVisible = false;
      this.taskIdToDelete = null;
    },
    getPriorityClass(priority) {
      switch (priority) {
        case 'Low':
          return 'priority-low';
        case 'Medium':
          return 'priority-medium';
        case 'High':
          return 'priority-high';
        default:
          return '';
      }
    }
  },
};
</script>

<style scoped>

.task-item {
  position: relative;
  margin: 5px 0 10px;
  background-color: #22272b;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 4px;
  padding: 20px 8px 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  color: #fff;
}

.task-item:hover {
  cursor: pointer;
}

.task-item__button {
  margin-left: 8px;
  background-color: inherit;
  color: white;
  border: none;
  border-radius: 0;
  padding: 4px;
  cursor: pointer;
}

.task-item__title {
  color: white;
  width: auto;
  flex: 1 1 auto;
}

.task-list__delete {
  width: 60px;
  min-width: 60px;
  background-color: inherit;
  border: none;
  cursor: pointer;
  padding: 4px;
  transition: transform 0.2s ease;
}

.task-list__delete i {
  color: white;
  transition: color 0.3s ease;
}

.task-list__delete:hover {
  transform: scale(1.1);
}

.task-list__delete:hover i {
  color: red;
}

.delete-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5;
}

.delete-modal {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.delete-modal__btn {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 100%;
}

.delete-modal button {
  margin: 10px;
  padding: 10px 20px;
  cursor: pointer;
}

.confirm-delete {
  background-color: #218838;
  color: white;
  border: none;
}

.cancel-delete {
  background-color: #5bc0de;
  color: white;
  border: none;
}

.task-item__priority {
  position: absolute;
  top: 5px;
  left: 8px;
  width: 50px;
  height: 8px;
  border-radius: 4px;
}


.priority-low {
  background-color: #00bcd4;
}

.priority-medium {
  background-color: #449639;
}

.priority-high {
  background-color: #f44336;
}
</style>
<template>
  <Teleport to="body">
    <div v-if="showPopup" class="popup">
      <div class="popup-content">
        <h2>{{ taskToEdit.id ? 'Редагувати задачу' : 'Створити задачу' }}</h2>
        <form @submit.prevent="save">
          <label for="title">Назва:</label>
          <textarea v-model="taskToEdit.title" id="title" required></textarea>

          <label for="description">Опис:</label>
          <textarea v-model="taskToEdit.description" id="description" required></textarea>

          <label for="assignee">Відповідальна особа:</label>
          <input v-model="taskToEdit.assignee" id="assignee" type="text" required/>

          <label for="priority">Пріоритет:</label>
          <select v-model="taskToEdit.priority" id="priority">
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          <label for="status">Статус:</label>
          <select v-model="taskToEdit.status" id="status">
            <option value="TODO">TODO</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
          <div class="popup-content__btn">
            <button type="submit">{{ taskToEdit.id ? 'Зберегти зміни' : 'Створити задачу' }}</button>
            <button class="popup-content__btn-close" @click="closePopup">Закрити</button>
          </div>
        </form>
      </div>
    </div>
  </Teleport>
</template>

<script>
export default {
  props: {
    showPopup: Boolean,
    task: Object,
  },
  emits: ['update:showPopup', 'saveTask', 'deleteTask'],
  data() {
    return {
      taskToEdit: this.task ? {...this.task} : {
        title: '',
        description: '',
        assignee: '',
        priority: 'Medium',
        status: 'TODO'
      },
    };
  },
  watch: {
    task(newTask) {
      if (newTask) {
        this.taskToEdit = {...newTask};
      }
    },
  },
  methods: {
    save() {
      this.$emit('saveTask', this.taskToEdit);
    },
    closePopup() {
      this.$emit('update:showPopup', false);
    },
  },
};
</script>

<style scoped>
.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
  overflow: auto;
}

.popup__btn-close {
  background: #a09c9c;
}

.popup__btn-close:hover {
  background: #878787;
}

.popup-content {
  background: hsla(206, 13.7%, 10%, 0.9);
  padding: 30px;
  border-radius: 12px;
  width: 400px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  height: auto;
  position: absolute;
  top: 0;
}

form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

label {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 5px;
  color: #B6C2CF;
}

.popup-content__btn {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

input,
textarea,
select {
  padding: 10px;
  font-size: 1rem;
  border-radius: 6px;
  border: 1px solid #ddd;
  outline: none;
  transition: border-color 0.3s ease;
}

input:focus,
textarea:focus,
select:focus {
  border-color: #007bff;
}

button {
  background-color: #28a745;
  color: white;
  padding: 12px;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #218838;
}

button[type="button"] {
  background-color: #dc3545;
}

button[type="button"]:hover {
  background-color: #c82333;
}

.delete-button {
  background-color: #dc3545;
  color: white;
  padding: 10px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  margin-top: 15px;
  text-align: center;
}
textarea{
  max-width: 400px;
  min-width: 400px;
  min-height: 60px;
  padding: 10px 0 10px 10px;
}
.delete-button:hover {
  background-color: #c82333;
}

.popup button,
.delete-button {
  align-self: center;
  width: 100%;
  max-width: 180px;
}

h2 {
  text-align: center;
  font-size: 2.0rem;
  color: #B6C2CF;
  margin: 0 0 20px;
}

.popup-content__btn-close{
  background: #434c50;
}

.popup-content__btn-close:hover{
  background: #3a3f41;
}

@media (max-width: 480px) {
  .popup-content {
    width: 90%;
    padding: 20px;
  }

  button {
    font-size: 0.9rem;
  }
}
</style>

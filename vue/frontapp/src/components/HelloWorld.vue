<template>
  <div class="hello">
    <form>
      <input type="text" style="display:none" />
      <input v-model="currentTask" type="text" />
      <input type="button" value="add!" @click="taskCreate" />
    </form>
    <table align="center" border="0">
      <tr>
        <th>task</th>
        <th>update</th>
        <th>delete</th>
      </tr>
      <tr v-for="(task, index) in tasks" :key="task.id">
        <td>
          <input v-model="task.taskname" type="text" />
        </td>
        <td>
          <input
            type="button"
            value="update"
            @click="taskUpdate(task.id, task.taskname)"
          />
        </td>
        <td>
          <input
            type="button"
            value="delete"
            @click="taskDelete(task.id, index)"
          />
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "HelloWorld",
  data: () => ({
    tasks: [],
    currentTask: ""
  }),
  created: async function() {
    try {
      const result = await axios.get("https://n-okamoto.t.telsys.co.jp");
      this.tasks = result.data;
      console.log(result);
    } catch (err) {
      console.log("okamooooooooooj");
      alert(JSON.stringify(err));
      console.log(JSON.stringify(err));
    }
  },
  methods: {
    taskCreate: async function() {
      try {
        const result = await axios.post("https://n-okamoto.t.telsys.co.jp/task", {
          task: this.currentTask
        });
        this.tasks.push(result.data);
        this.currentTask = "";
      } catch (err) {
        alert(JSON.stringify(err));
      }
    },
    taskDelete: async function(id, index) {
      try {
        await axios.delete("https://n-okamoto.t.telsys.co.jp/task/" + id);
        this.currentTask = "";
        this.tasks.splice(index, 1);
      } catch (err) {
        alert(JSON.stringify(err));
      }
    },
    taskUpdate: async function(id, val) {
      try {
        await axios.put("https://n-okamoto.t.telsys.co.jp/task/" + id, {
          task: val
        });
        alert("タスクを修正しました");
        this.currentTask = "";
      } catch (err) {
        alert(JSON.stringify(err));
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.table {
  height: 100%;
  text-align: center;
}
</style>

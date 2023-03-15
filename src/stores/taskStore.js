import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  setDoc,
  updateDoc,
  doc,
  deleteDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { Modal } from 'bootstrap'

import { defineStore } from "pinia";
import { ref } from 'vue';

export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    tasks: [],
    loading: false,
    toUpdate: {}
  }),
  getters: {
    totalCount() {
      return this.tasks.length;
    },
    pinned() {
      return this.tasks.filter((t) => t.pinned);
    },
    pinCount() {
      return this.tasks.reduce((prev, curr) => {
        return curr.pinned ? prev + 1 : prev;
      }, 0);
    },
    tags() {
      return Array.from(new Set(this.tasks.flatMap((x) => x.tags))).sort();
    },
    tag() {
      return (key) => this.tasks.filter((t) => t.tags.includes(key));
    },
    userTasks() {
      return (key) => this.tasks.filter((t) => t.createdBy === key);
    }
  },
  actions: {
    async getTasks() {
      const defaultTasks = query(collection(getFirestore(), 'tasks'), orderBy('timestamp', 'desc'), limit(100));
      
      // Start listening to the query.
      onSnapshot(defaultTasks, (snapshot) => {
        this.tasks = []
        // console.log(snapshot.docs)
        snapshot.forEach((task) => {
          // console.log(task)
            // console.log(task.data())
            this.tasks.push(task.data());
        });
      });
    },
    async  addTask(task) {
      try {
       const docRef = doc(collection(getFirestore(), 'tasks'))
       await setDoc(docRef, {
          id: docRef.id,
          title: task.title,
          detail: task.detail,
          pinned: task.pinned,
          tags: task.tags,
          timestamp: serverTimestamp(),
          createdBy: task.createdBy
        });
      }
      catch(error) {
        console.error('Error writing new message to Firebase Database', error);
      }
    },
    async deleteTask(id) {
      await deleteDoc(doc(getFirestore(), 'tasks', id))
    },
    async togglePin(id) {
      const task = this.tasks.find((t) => t.id === id);      
      // console.log(task)
      await updateDoc(doc(getFirestore(), 'tasks', id), {
        pinned: !task.pinned
      })
    },
    async updateTask(field, value) {
      const taskUpdates = {}
      value ? taskUpdates[field] = value : taskUpdates[field] = serverTimestamp()
      
      await updateDoc(doc(getFirestore(), 'tasks', this.toUpdate.id), taskUpdates).catch(err =>{
        console.log(err)
      })
    },
    async toggleUpdate(task) {
      const modal = ref(new Modal('#taskUpdateModal'))
      this.toUpdate = task
      modal.value.toggle()
      // console.log(modal.value._element)
    },
    async clearUpdate() {
      this.toUpdate = {}
    },
  },
});

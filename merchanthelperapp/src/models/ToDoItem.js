class ToDoItem extends ReactAxiom.Model {
    static defaultState() {
      return {
        id: null,
        description: '',
        title: '',
        completed: false
      };
    }
  }
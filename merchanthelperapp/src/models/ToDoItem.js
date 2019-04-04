class ToDoItem extends ReactAxiom.Model {
    static defaultState() {
      return {
        id: null,
        location: null,
        description: '',
        title: '',
        completed: false
      };
    }
  }
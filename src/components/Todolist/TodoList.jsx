import React, { Component } from "react";
import "./style.css";
import { Card, Header, Form, Input, Icon } from "semantic-ui-react";

class TodoList extends Component {
  constructor() {
    super();

    this.state = {
      task: "",
      tasklist: []
    };
  }

  componentDidMount = () => {
    this.getTasks();
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = () => {
    if (this.state.task) {
      let tasklist = JSON.parse(localStorage.getItem("tasklist"));
      if (tasklist === null) {
        tasklist = [];
      }
      let task = {
        task: `${this.state.task}`,
        status: false
      };

      tasklist.push(task);

      localStorage.setItem("tasklist", JSON.stringify(tasklist));

      this.setState({
        task: ""
      });

      this.getTasks();
    }
  };

  getTasks = () => {
    let tasklist = JSON.parse(localStorage.getItem("tasklist"));
    if (tasklist) {
      tasklist = tasklist.sort((a, b) => {
        if (a.status) {
          return 1;
        } else if (b.status) {
          return -1;
        } else {
          return 0;
        }
      });
    }

    localStorage.setItem("tasklist", JSON.stringify(tasklist));

    this.setState({
      tasklist: tasklist.map((item, index) => {
        let color = "yellow";
        let cardBackground = { background: "white" };
        let taskComplete = { textDecoration: "none" };

        if (item.status) {
          color = "green";
          cardBackground.background = "beige";
          taskComplete["textDecoration"] = "line";
        }
        return (
            <Card key={index} color={color} fluid style={cardBackground}>
              <Card.Content>
                <Card.Header textAlign="left" style={taskComplete}>
                  <div style={{ wordWrap: "break-word" }}>{item.task}</div>
                </Card.Header>

                <Card.Meta textAlign="right">
                  <Icon
                    link
                    name="check circle"
                    color="green"
                    onClick={() => this.updateTask(index)}
                  />
                  <span style={{ paddingRight: 10 }}>Done</span>
                  <Icon
                    link
                    name="undo"
                    color="yellow"
                    onClick={() => this.undoTask(index)}
                  />
                  <span style={{ paddingRight: 10 }}>Undo</span>
                  <Icon
                    link
                    name="delete"
                    color="red"
                    onClick={() => this.deleteTask(index)}
                  />
                  <span style={{ paddingRight: 10 }}>Delete</span>
                </Card.Meta>
              </Card.Content>
            </Card>
        );
      })
    });
  };

  updateTask = index => {
    let tasklist = JSON.parse(localStorage.getItem("tasklist"));
    tasklist[index].status = true;
    localStorage.setItem("tasklist", JSON.stringify(tasklist));
    this.getTasks();
  };

  undoTask = index => {
    let tasklist = JSON.parse(localStorage.getItem("tasklist"));
    tasklist[index].status = false;
    localStorage.setItem("tasklist", JSON.stringify(tasklist));
    this.getTasks();
  };

  deleteTask = index => {
    let tasklist = JSON.parse(localStorage.getItem("tasklist"));
    tasklist.splice(index, 1);
    localStorage.setItem("tasklist", JSON.stringify(tasklist));
    this.getTasks();
  };

  render() {
    return (
      <div>
        <div>
          <Header as="h1">
            <div className="app-header">Todo List</div>
          </Header>
        </div>
        <div className="app-form">
          <Form onSubmit={this.onSubmit}>
            <Input
              type="text"
              name="task"
              onChange={this.onChange}
              value={this.state.task}
              fluid
              placeholder="task..."
            />
          </Form>
        </div>
        <div>
          <Card.Group>{this.state.tasklist}</Card.Group>
        </div>
      </div>
    );
  }
}

export default TodoList;

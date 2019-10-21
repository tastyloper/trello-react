import React, { Component } from 'react'
import { Container, Draggable } from "react-smooth-dnd";
import './App.scss';
import 'font-awesome/css/font-awesome.min.css';

const applyDrag = (arr, dragResult) => {
  const { removedIndex, addedIndex, payload } = dragResult;
  if (removedIndex === null && addedIndex === null) return arr;

  const result = [...arr];
  let itemToAdd = payload;

  if (removedIndex !== null) {
    itemToAdd = result.splice(removedIndex, 1)[0];
  }

  if (addedIndex !== null) {
    result.splice(addedIndex, 0, itemToAdd);
  }

  return result;
};

const bgColors = ['#0079BF', '#D29034', '#4BBF6B', '#B03642'];

class App extends Component {
  state = {
    bgColor: '#0079BF',
    colorBoolean: false,
    trello: {
      type: 'container',
      props: {
        orientation: 'horizontal'
      },
      children: [
        {
          id: '0',
          title: 'todo1',
          type: 'container',
          props: {
            orientation: 'vertical',
            className: 'card-container'
          },
          children: [
            {
              id: '00',
              title: 'todo1-1',
              description: 'todo1-1',
              comments: [
                {
                  id: 0,
                  comment: 'todo1-1',
                }
              ],
              type: 'draggable',
              props: {
                className: 'card',
              },
            },
            {
              id: '01',
              title: 'todo1-2',
              description: 'todo1-2',
              comments: [
                {
                  id: 0,
                  comment: 'todo1-2',
                }
              ],
              type: 'draggable',
              props: {
                className: 'card',
              },
            },
          ],
        },
        {
          id: '1',
          title: 'todo2',
          type: 'container',
          props: {
            orientation: 'vertical',
            className: 'card-container'
          },
          children: [
            {
              id: '10',
              title: 'todo2-1',
              description: 'todo2-1',
              comments: [
                {
                  id: 0,
                  comment: 'todo2-1',
                }
              ],
              type: 'draggable',
              props: {
                className: 'card',
              },
            },
            {
              id: '11',
              title: 'todo2-2',
              description: 'todo2-2',
              comments: [
                {
                  id: 0,
                  comment: 'todo2-2',
                }
              ],
              type: 'draggable',
              props: {
                className: 'card',
              },
            },
          ],
        },
      ],
    },
  };

  getCardPayload = (columnId, index) => {
    return this.state.trello.children.filter(p => p.id === columnId)[0].children[
      index
    ];
  }

  onColumnDrop = dropResult => {
    const trello = Object.assign({}, this.state.trello);
    trello.children = applyDrag(trello.children, dropResult);
    this.setState({
      trello
    });
  }

  onCardDrop = (columnId, dropResult) => {
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      const trello = Object.assign({}, this.state.trello);
      const column = trello.children.filter(p => p.id === columnId)[0];
      const columnIndex = trello.children.indexOf(column);

      const newColumn = Object.assign({}, column);
      newColumn.children = applyDrag(newColumn.children, dropResult);
      trello.children.splice(columnIndex, 1, newColumn);

      this.setState({
        trello
      });
    }
  }

  toggleBGMenu = () => {
    this.setState({ colorBoolean: true });
  }

  changeBgColor(bgColor) {
    this.setState({ colorBoolean: false, bgColor });
  }

  render() {
    return (
      <section className="wrapper" style={{ backgroundColor: this.state.bgColor }}>
        <header>
          <h1 className="logo"><i className="fa fa-trello"></i> Trello</h1>
          <button className="bg-change-btn" onClick={this.toggleBGMenu}>
            <i className="fa fa-paint-brush"></i>
          </button>
          {this.state.colorBoolean
            ? (
              <div className="bg-change-box">
                {bgColors.map((color , i) => {
                  return <div key={i} className="color-picker" style={{ backgroundColor: color }} onClick={() => this.changeBgColor(color)}></div>;
                })}
              </div>
            )
            : ''
          }
        </header>
        <div className="card-trello">
          <Container
            orientation="horizontal"
            onDrop={this.onColumnDrop}
            dragHandleSelector=".column-drag-handle"
            dropPlaceholder={{
              animationDuration: 150,
              showOnTop: true,
              className: 'cards-drop-preview'
            }}
          >
            {this.state.trello.children.map(column => {
              return (
                <Draggable key={column.id}>
                  <div className={column.props.className}>
                    <div className="card-column-header">
                      <span className="column-drag-handle">&#x2630;</span>
                      {column.title}
                    </div>
                    <Container
                      {...column.props}
                      groupName="col"
                      onDragStart={e => console.log("drag started", e)}
                      onDragEnd={e => console.log("drag end", e)}
                      onDrop={e => this.onCardDrop(column.id, e)}
                      getChildPayload={index =>
                        this.getCardPayload(column.id, index)
                      }
                      dragClass="card-ghost"
                      dropClass="card-ghost-drop"
                      onDragEnter={() => {
                        console.log("drag enter:", column.id);
                      }}
                      onDragLeave={() => {
                        console.log("drag leave:", column.id);
                      }}
                      onDropReady={p => console.log('Drop ready: ', p)}
                      dropPlaceholder={{                      
                        animationDuration: 150,
                        showOnTop: true,
                        className: 'drop-preview' 
                      }}
                      dropPlaceholderAnimationDuration={200}
                    >
                      {column.children.map(card => {
                        return (
                          <Draggable key={card.id}>
                            <div {...card.props}>
                              <p>{card.title}</p>
                            </div>
                          </Draggable>
                        );
                      })}
                    </Container>
                  </div>
                </Draggable>
              );
            })}
          </Container>
        </div>
      </section>
    );
  }
}

export default App;

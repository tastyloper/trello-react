import React, { Component, createRef } from 'react'
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
    listTilteEdit: '-1',
    addCardOpen: '-1',
    addListOpen: false,
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
  inputRef = createRef();

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

  closeOpened = (e) => {
    if (!(e.target.classList.contains('bg-change-box') || e.target.classList.contains('bg-change-btn') || e.target.classList.contains('fa-paint-brush'))) {
      this.setState({ colorBoolean: false });
    }
    if (!(e.target.classList.contains('list-card-composer-textarea') ||
          e.target.classList.contains('textarea-box') ||
          e.target.classList.contains('add-btn') ||
          e.target.classList.contains('add-card-btn') ||
          e.target.classList.contains('fa-plus') ||
          e.target.classList.contains('card-composer'))) {
      this.setState({ addCardOpen: '-1' });
    }
    if (!(e.target.classList.contains('add-list-btn') ||
          e.target.classList.contains('fa-plus') ||
          e.target.classList.contains('add-list-wrap') ||
          e.target.classList.contains('list-title-input') ||
          e.target.classList.contains('add-btn') ||
          e.target.classList.contains('card-composer'))) {
      this.setState({ addListOpen: false });
    }
  }

  toggleBGMenu = () => {
    this.setState(prevState => ({ colorBoolean: !prevState.colorBoolean }));
  }

  changeBgColor(bgColor) {
    this.setState({ colorBoolean: false, bgColor });
  }

  listTitleOpen = (e, listTilteEdit) => {
    e.target.nextSibling.focus()
    this.setState({ listTilteEdit });
  }

  listTitleClose = () => {
    this.setState({ listTilteEdit: '-1' });
  }

  listTitleChange = (e) => {
    console.dir(e.target);
  }

  cardTitleResize = (e, listId) => {
    if (e.keyCode === 13) {
      if (!e.target.value) return;
      if (!e.shiftKey) {
        this.addCard(listId);
      }
    } else {
      e.target.style.height = '1px';
      e.target.style.height = `${e.target.scrollHeight}px`;
    }
  }

  generateCardId = (cards) => {
    return cards.length ? Math.max(...cards.map(({ id }) => id.split('')[1] * 1)) + 1 : 0;
  }

  addCard = (listId) => {
    const $cardAddTextarea = document.querySelector(`#textarea${listId}`);
    const title = $cardAddTextarea.value;
    if (!title.trim()) return;
    this.setState(prevState => {
      return {
        trello: {
          ...prevState.trello,
          children: [...prevState.trello.children].map(list => {
            return list.id === listId ? { ...list, children: [...list.children, {
              id: `${listId}${this.generateCardId(list.children)}`,
              title,
              description: '',
              comments: [],
              type: 'draggable',
              props: {
                className: 'card',
              },
            }] } : list
          })
        },
      };
    });
    $cardAddTextarea.value = '';
  }

  addCardOpen = (addCardOpen) => {
    document.querySelector(`#textarea${addCardOpen}`).focus();
    this.setState({ addCardOpen })
  }

  removeCard = (listId, cardId) => {
    this.setState(prevState => {
      return {
        trello: {
          ...prevState.trello,
          children: [...prevState.trello.children].map(list => {
            return list.id === listId ? { ...list, children: [...list.children.filter(card => card.id !== cardId)] } : list
          })
        },
      };
    });
  }

  addListOpen = () => {
    this.setState({ addListOpen : true });
    this.inputRef.current.focus();
  }

  generateListId = (lists) => {
    return lists.length ? Math.max(...lists.map(({ id }) => id * 1)) + 1 : 0;
  }

  addList = (e) => {
    const title = this.inputRef.current.value;
    if (!(e.keyCode === 13 || e.type === 'click') || !title.trim()) return;
    this.setState(prevState => {
      return {
        trello: {
          ...prevState.trello,
          children: [...prevState.trello.children, {
            id: `${this.generateListId(prevState.trello.children)}`,
            title,
            type: 'container',
            props: {
              orientation: 'vertical',
              className: 'card-container'
            },
            children: [],
          }]
        },
      };
    });
    this.inputRef.current.value = '';
  }

  removeList = (listId) => {
    this.setState(prevState => {
      return {
        trello: {
          ...prevState.trello,
          children: [...prevState.trello.children.filter(list => {
            return list.id !== listId
          })]
        },
      };
    });
  }

  render() {
    return (
      <section className="wrapper" style={{ backgroundColor: this.state.bgColor }} onClick={this.closeOpened}>
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
        <section className="board-title-wrap">
          <h2 className="board-title">projectTitle</h2>
        </section>
        <section className="card-trello">
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
                    <div className={`card-column-header${this.state.listTilteEdit === column.id ? ' is-edit' : ''}`}>
                      <span
                        className="column-drag-handle"
                        onClick={(e) => this.listTitleOpen(e, column.id)}
                      ></span>
                      <textarea className="list-title" value={column.title} onChange={this.listTitleChange} onBlur={this.listTitleClose}></textarea>
                      <button className="list-delete-btn" onClick={() => this.removeList(column.id)}>
                        <i className="fa fa-trash-o"></i>
                        </button>
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
                              <button className="card-open-btn">{card.title}</button>
                              <span className="remove-card-btn" onClick={() => (this.removeCard(column.id, card.id))}>
                                <i className="fa fa-trash-o"></i>
                              </span>
                            </div>
                          </Draggable>
                        );
                      })}
                    </Container>
                    <div className={`card-composer${this.state.addCardOpen !== column.id ? ' readable-hidden' : ''}`}>
                      <div className="textarea-box">
                        <textarea className="list-card-composer-textarea" placeholder="Enter a title for this card…"
                          onKeyUp={(e) => (this.cardTitleResize(e, column.id))} spellCheck="false" id={`textarea${column.id}`}></textarea>
                      </div>
                      <button className="add-btn" onClick={() => (this.addCard(column.id))}>Add Card</button>
                      <button className="cancle-btn" onClick={() => (this.setState({ addCardOpen: '-1' }))}>
                        <i className="fa fa-times"></i>
                      </button>
                    </div>
                    <button
                      className={`add-card-btn${this.state.addCardOpen === column.id ? ' readable-hidden' : ''}`}
                      onClick={() => (this.addCardOpen(column.id))}
                    >
                      <i className="fa fa-plus"></i> Add Card
                    </button>
                  </div>
                </Draggable>
              );
            })}
          </Container>
          <div className="list-wrap">
            <button
              className={`add-list-btn${this.state.addListOpen ? ' readable-hidden' : ''}`}
              onClick={this.addListOpen}>
              <i className="fa fa-plus"></i> Add List
            </button>
            <div className={`add-list-wrap${!this.state.addListOpen ? ' readable-hidden' : ''}`}>
              <input type="text" ref={this.inputRef} className="list-title-input" onKeyUp={this.addList} placeholder="Enter list title..." />
              <button className="add-btn" onClick={this.addList}>Add List</button>
              <button className="cancle-btn" onClick={() => (this.setState({ addListOpen : false }))}><i className="fa fa-times"></i></button>
            </div>
          </div>
        </section>
      </section>
    );
  }
}

export default App;

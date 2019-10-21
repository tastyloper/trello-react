import * as types from '../actions/ActionTypes';

// 초기 상태를 정의합니다
const initialState = {
  bgColor: '#0079BF',
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

/* 
    리듀서 함수를 정의합니다. 리듀서는 state 와 action 을 파라미터로 받습니다.
    state 가 undefined 일때 (스토어가 생성될때) state 의 기본값을 initialState 로 사용합니다.
    action.type 에 따라 다른 작업을 하고, 새 상태를 만들어서 반환합니다.
    이 때 주의 할 점은 state 를 직접 수정하면 안되고,
    기존 상태 값에 원하는 값을 덮어쓴 새로운 객체를 만들어서 반환해야합니다.
*/
const trello = (state = initialState, action) => {
  switch (action.type) {
    case types.CHANGE_BG:
      return {
        ...state,
        bgColor: action.color
      };
    default:
      return state;
  }
};

export default trello;
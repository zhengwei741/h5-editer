import store from '@/store/index'
import { last } from 'lodash-es'

describe('测试 vuex store', () => {
  it('是否包含模块', () => {
    expect(store.state).toHaveProperty('user')
    expect(store.state).toHaveProperty('editer')
    expect(store.state).toHaveProperty('templates')
  })

  it('测试user模块', async () => {
    expect(store.state.user.isLogin).toBeFalsy()

    // mutations

    store.commit('login', { userName: 'testName' })

    expect(store.state.user.isLogin).toBeTruthy()

    expect(store.state.user.userName).toBe('testName')

    store.commit('loginOut')

    expect(store.state.user.isLogin).toBeFalsy()

    expect(store.state.user.userName).toBe('')

    // actions

    await store.dispatch('login')

    expect(store.state.user.userName).toBe('test')

    store.dispatch('loginOut')

    expect(store.state.user.isLogin).toBeFalsy()

    expect(store.state.user.userName).toBe('')
  })

  it('测试templates模块', () => {
    expect(store.state.templates.data).toHaveLength(1)
  })

  it('测试editer模块', () => {
    // 初始化
    expect(store.state.editer.components).toHaveLength(1)
    expect(store.state.editer.currentElement).toBe('')
    // mutations

    store.commit('addComponent', {
      id: '1',
      props: {
        text: '123',
        color: 'red',
      },
      name: 'l-text',
    })
    expect(store.state.editer.components).toHaveLength(2)

    expect(last(store.state.editer.components)?.id).toBe('1')

    store.commit('setActive', '1')

    expect(store.state.editer.currentElement).toBe('1')

    expect(store.getters.getCurrentElement.id).toBe('1')

    store.commit('updateComponent', {
      key: 'text',
      value: 'testvalue',
    })
    expect(store.getters.getCurrentElement.props.text).toBe('testvalue')

    store.commit('deleteComponent', { id: '1' })

    expect(store.state.editer.components).toHaveLength(1)

    expect(last(store.state.editer.components)?.id === '1').toBeFalsy()
  })
})

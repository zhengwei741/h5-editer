import { shallowMount, VueWrapper } from '@vue/test-utils'
import FileUploader from '@/components/fileUploader/index.vue'
import axios from 'axios'
import flushPromises from 'flush-promises'

let wrapper: VueWrapper<any>

jest.mock('axios')

// mockAxios 可以 mock 掉 axios 中实现方法
const mockAxios = axios as jest.Mocked<typeof axios>

const testFile = new File(['111'], 'test.txt', { type: 'txt' })

describe('测试 fileUploader', () => {
  beforeAll(() => {
    wrapper = shallowMount(FileUploader)
  })

  it('dom 节点', () => {
    expect(wrapper.find('input').exists()).toBeTruthy()
    expect(wrapper.find('button').text()).toBe('点击上传')
  })
  it('上传成功用例', async () => {
    mockAxios.post.mockResolvedValueOnce({ state: 'success' })

    // 会导致类型不正确
    // wrapper.find('input').element.files = [testFile]
    const input = wrapper.find('input')
    // 通过拦截files属性
    Object.defineProperty(input.element, 'files', {
      value: [testFile],
      writable: false,
    })
    await input.trigger('change')
    expect(mockAxios.post).toHaveReturnedTimes(1)
    expect(wrapper.get('button span').text()).toBe('上传中')
    await flushPromises()
    expect(wrapper.get('button span').text()).toBe('上传成功')
  })
  it('上传失败用例', async () => {
    mockAxios.post.mockRejectedValueOnce({ error: 'error' })
    const input = wrapper.find('input')
    await input.trigger('change')
    expect(mockAxios.post).toHaveReturnedTimes(2)
    expect(wrapper.find('button').text()).toBe('上传中')
    await flushPromises()
    expect(wrapper.find('button').text()).toBe('上传失败')
  })
})

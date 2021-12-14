import { VNode } from 'vue'
import { TextComponentProps } from './defaultProps'

export interface PropToForm {
  component: string
  extarProps?: any
  text?: string
  subComponent?: string
  options?: Array<any>
  initalTransform?: (v: any) => any
  afterTransform?: (v: any) => any
  valueProp?: string | any
  eventName?: string
}

export type PropsToForms = {
  [P in keyof TextComponentProps]?: PropToForm
}

const fontFamilyArr = [
  { text: '无', value: '' },
  { text: '宋体', value: '"SimSun","STSong"' },
  { text: '黑体', value: '"SimHei","STHeiti"' },
  { text: '楷体', value: '"KaiTi","STKaiti"' },
  { text: '仿宋', value: '"FangSong","STFangsong"' },
]
const fontFamilyOptions = fontFamilyArr.map((font) => {
  return {
    value: font.value,
    text: (
      <span style={{ fontFamily: font.value }}>{font.text}</span>
    ) as VNode,
  }
})

export const mapToPropsToForms: PropsToForms = {
  text: {
    component: 'a-input',
    text: '文本',
    afterTransform: (v: any) => v.target.value,
  },
  fontSize: {
    component: 'a-input-number',
    text: '字号',
    initalTransform(v: string) {
      return parseInt(v)
    },
    afterTransform: (e: number) => (e ? `${e}px` : ''),
  },
  lineHeight: {
    component: 'a-slider',
    text: '行高',
    extarProps: {
      max: 3,
      min: 1,
      step: 0.1,
    },
    initalTransform(v: string) {
      return parseFloat(v)
    },
    afterTransform: (e: number) => e.toString(),
  },
  textAlign: {
    component: 'a-radio-group',
    subComponent: 'a-radio-button',
    text: '对齐',
    options: [
      {
        value: 'left',
        text: '左',
      },
      {
        value: 'center',
        text: '中',
      },
      {
        value: 'right',
        text: '右',
      },
    ],
    afterTransform: (e: any) => e.target.value,
  },
  fontFamily: {
    component: 'a-select',
    subComponent: 'a-select-option',
    text: '字体',
    options: fontFamilyOptions,
  },
  opacity: {
    component: 'a-slider',
    text: '透明度',
    extarProps: {
      max: 100,
      min: 0,
      step: 1,
    },
    initalTransform(v: string) {
      return parseFloat(v) * 100
    },
    afterTransform: (e: number) => (e / 100).toString(),
  },
  color: {
    component: 'color-picker',
    text: '颜色',
  },
}

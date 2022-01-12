import { VNode } from 'vue'
import { AllComponentProps } from './defaultProps'

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
  [P in keyof AllComponentProps]?: PropToForm
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

const size = {
  // 尺寸
  height: {
    component: 'a-input-number',
    text: '高度',
    initalTransform(v: string) {
      if (!v) {
        v = '36'
      }
      return parseInt(v)
    },
    afterTransform: (e: number) => (e ? `${e}px` : ''),
  },
  width: {
    component: 'a-input-number',
    text: '宽度',
    initalTransform(v: string) {
      if (!v) {
        v = '36'
      }
      return parseInt(v)
    },
    afterTransform: (e: number) => (e ? `${e}px` : ''),
  },
  paddingLeft: {
    component: 'a-input-number',
    text: '左边距',
    initalTransform(v: string) {
      if (!v) {
        v = '0'
      }
      return parseInt(v)
    },
    afterTransform: (e: number) => (e ? `${e}px` : ''),
  },
  paddingRight: {
    component: 'a-input-number',
    text: '右边距',
    initalTransform(v: string) {
      if (!v) {
        v = '0'
      }
      return parseInt(v)
    },
    afterTransform: (e: number) => (e ? `${e}px` : ''),
  },
  paddingTop: {
    component: 'a-input-number',
    text: '上边距',
    initalTransform(v: string) {
      if (!v) {
        v = '0'
      }
      return parseInt(v)
    },
    afterTransform: (e: number) => (e ? `${e}px` : ''),
  },
  paddingBottom: {
    component: 'a-input-number',
    text: '下边距',
    initalTransform(v: string) {
      if (!v) {
        v = '0'
      }
      return parseInt(v)
    },
    afterTransform: (e: number) => (e ? `${e}px` : ''),
  },
}

const border = {
  borderStyle: {
    component: 'a-select',
    subComponent: 'a-select-option',
    text: '边框样式',
    options: [
      { text: '无', value: 'none' },
      { text: '实线', value: 'solid' },
      { text: '虚线', value: 'dotted' },
      { text: '破折现', value: 'dashed' },
    ],
    initalTransform(v: string) {
      if (!v) {
        v = 'none'
      }
      return v
    },
  },
  borderColor: {
    component: 'color-picker',
    text: '边框颜色',
  },
  borderWidth: {
    component: 'a-slider',
    text: '边框宽度',
    initalTransform(v: string) {
      if (!v) {
        v = '0'
      }
      if (v.length > 3) {
        v = v.substring(0, v.length - 2)
      }
      return parseFloat(v)
    },
    afterTransform: (e: number) => e.toString() + 'px',
  },
  borderRadius: {
    component: 'a-slider',
    text: '边框圆角',
    extarProps: {
      max: 100,
      min: 0,
      step: 1,
    },
    initalTransform(v: string) {
      if (!v) {
        v = '0'
      }
      if (v.length >= 3) {
        v = v.substring(0, v.length - 2)
      }
      return parseFloat(v)
    },
    afterTransform: (e: number) => e.toString() + 'px',
  },
}

const shadow = {
  boxShadow: {
    component: 'shadow-picker',
  },
}

const position = {
  left: {
    component: 'a-slider',
    text: 'X 轴坐标',
    initalTransform(v: string) {
      if (!v) {
        v = '0'
      }
      if (v.length > 3) {
        v = v.substring(0, v.length - 2)
      }
      return parseFloat(v)
    },
    afterTransform: (e: number) => e.toString() + 'px',
  },
  top: {
    component: 'a-slider',
    text: 'Y 轴坐标',
    initalTransform(v: string) {
      if (!v) {
        v = '0'
      }
      if (v.length > 3) {
        v = v.substring(0, v.length - 2)
      }
      return parseFloat(v)
    },
    afterTransform: (e: number) => e.toString() + 'px',
  },
}

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
    extarProps: {
      min: 12,
    },
  },
  fontWeight: {
    component: 'icon-switch',
    initalTransform(v: string) {
      return v === 'bold'
    },
    afterTransform: (e: boolean) => {
      return e ? 'bold' : ''
    },
    extarProps: {
      tip: '加粗',
      iconName: 'BoldOutlined',
    },
    valueProp: 'checked',
  },
  fontStyle: {
    component: 'icon-switch',
    initalTransform(v: string) {
      return v === 'italic'
    },
    afterTransform: (e: boolean) => {
      return e ? 'italic' : 'normal'
    },
    extarProps: {
      tip: '斜体',
      iconName: 'ItalicOutlined',
    },
    valueProp: 'checked',
  },
  textDecoration: {
    component: 'icon-switch',
    initalTransform(v: string) {
      return v === 'underline'
    },
    afterTransform: (e: boolean) => {
      return e ? 'underline' : 'none'
    },
    extarProps: {
      tip: '下划线',
      iconName: 'UnderlineOutlined',
    },
    valueProp: 'checked',
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
      if (!v) {
        v = '1'
      }
      return parseFloat(v) * 100
    },
    afterTransform: (e: number) => (e / 100).toString(),
  },
  color: {
    component: 'color-picker',
    text: '颜色',
  },
  src: {
    component: 'image-processer',
  },
  ...size,
  ...border,
  ...shadow,
  ...position,
}

// export interface CommonDefaultProps {
//   // actions
//   actionType: string
//   url: string
//   // size
//   height: string
//   width: string
//   paddingLeft: string
//   paddingRight: string
//   paddingTop: string
//   paddingBottom: string
//   // border type
//   borderStyle: string
//   borderColor: string
//   borderWidth: string
//   borderRadius: string
//   // shadow and opacity
//   boxShadow: string
//   opacity: string
//   // position and x,y
//   position: string
//   left: string
//   top: string
//   right: string
// }

// export interface TextComponentProps {
//   text: string
//   fontSize: string
//   fontFamily: string
//   fontWeight: string
//   fontStyle: string
//   textDecoration: string
//   lineHeight: string
//   textAlign: string
//   color: string
//   backgroundColor: string
// }

import { mapValues, without } from 'lodash-es'

export const CommonDefaultProps = {
  // actions
  actionType: '',
  url: '',
  // size
  height: '',
  width: '300px',
  paddingLeft: 0,
  paddingRight: 0,
  paddingTop: 0,
  paddingBottom: 0,
}

export const TextComponentProps = {
  text: '',
  fontSize: '30px',
  fontFamily: '',
  fontWeight: '',
  fontStyle: '',
  textDecoration: '',
  lineHeight: '',
  textAlign: '',
  color: '',
  backgroundColor: '',
  ...CommonDefaultProps,
}

export const textDefaultProps = without(
  Object.keys(TextComponentProps),
  'actionType',
  'url',
  'text'
)

export const transformToComponentProps = (props: any) => {
  return mapValues(props, function (item) {
    return {
      type: item.constructor,
      default: item,
    }
  })
}

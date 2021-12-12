export interface CommonDefaultProps {
  // actions
  actionType: string
  url: string
  // size
  height: string
  width: string
  paddingLeft: string
  paddingRight: string
  paddingTop: string
  paddingBottom: string
  // border type
  borderStyle: string
  borderColor: string
  borderWidth: string
  borderRadius: string
  // shadow and opacity
  boxShadow: string
  opacity: string
  // position and x,y
  position: string
  left: string
  top: string
  right: string
}

export interface TextComponentProps extends CommonDefaultProps {
  text: string
  fontSize: string
  fontFamily: string
  fontWeight: string
  fontStyle: string
  textDecoration: string
  lineHeight: string
  textAlign: string
  color: string
  backgroundColor: string
}

import { mapValues, without } from 'lodash-es'

export const CommonDefaultProps: CommonDefaultProps = {
  // actions
  actionType: '',
  url: '',
  // size
  height: '',
  width: '100%',
  paddingLeft: '0px',
  paddingRight: '0px',
  paddingTop: '0px',
  paddingBottom: '0px',
  // border type
  borderStyle: 'none',
  borderColor: '#000',
  borderWidth: '0',
  borderRadius: '0',
  // shadow and opacity
  boxShadow: '0 0 0 #000000',
  opacity: '1',
  // position and x,y
  position: 'relative', //  absolute
  left: '0',
  top: '0',
  right: '0',
}

export const TextComponentProps: TextComponentProps = {
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

export const transformToComponentProps = <T extends CommonDefaultProps>(
  props: T
) => {
  return mapValues(props, function (item) {
    return {
      type: (item as any).constructor as StringConstructor,
      default: item,
    }
  })
}

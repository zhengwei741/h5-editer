import { createStore } from 'vuex'
import user, { UserProps } from './user'
import templates, { TemplatesProps } from './templates'
import editer, { EditerProps } from './editer'
import global, { globalProps } from './global'

export interface GlobalDataProps {
  user: UserProps
  templates: TemplatesProps
  editer: EditerProps
  global: globalProps
}

export default createStore<GlobalDataProps>({
  modules: {
    user,
    templates,
    editer,
    global,
  },
})

import { createStore } from 'vuex'
import user, { UserProps } from './user'
import templates, { TemplatesProps } from './templates'
import editer, { EditerProps } from './editer'

export interface GlobalDataProps {
  user: UserProps
  templates: TemplatesProps
  editer: EditerProps
}

export default createStore<GlobalDataProps>({
  modules: {
    user,
    templates,
    editer,
  },
})

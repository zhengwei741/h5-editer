import http from '@/utils/http'
import { TemplateProps } from '@/store/templates'
import { ResponseListData, RespWorkData, WorkData } from '@/shared/responseType'

export const fetchTemplates = () =>
  http.get<ResponseListData<TemplateProps>>('/templates')

export const fetchWork = (id: string | number) =>
  http.get<RespWorkData>('/fetchWork', {
    id,
  })

export const saveWork = (work: WorkData) =>
  http.post<RespWorkData>('/work', {
    ...work,
  })

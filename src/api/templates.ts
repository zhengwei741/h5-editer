import { defHttp } from '@/utils/http'
import { TemplateProps } from '@/store/templates'
import { ResponseListData, RespWorkData, WorkData } from '@/shared/responseType'

export const fetchTemplates = () =>
  defHttp.get<ResponseListData<TemplateProps>>('/templates')

export const fetchWork = (id: string | number) =>
  defHttp.get<RespWorkData>('/work', {
    id,
  })

export const saveWork = (work: WorkData) =>
  defHttp.post<RespWorkData>('/work', {
    ...work,
  })

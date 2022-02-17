import { defHttp } from '@/utils/http'
import { TemplateProps } from '@/store/templates'
import { ResponseListData, RespWorkData } from '@/shared/responseType'

export const fetchTemplates = () =>
  defHttp.get<ResponseListData<TemplateProps>>('/templates')

export const fetchWork = (id: string) =>
  defHttp.get<RespWorkData>('/works', {
    id,
  })

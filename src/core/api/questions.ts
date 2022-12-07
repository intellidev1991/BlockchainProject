/* eslint-disable */
import { IQuestionsResponse, IRootResponse, ORDER, SORT } from "../interfaces";
import { ServiceApi } from "../services/service.api";

const baseServiceUrl = "/questions";

interface IQuestionParams {
  page: number;
  pagesize: number;
  order: ORDER;
  sort: SORT;
  tagged: string;
  site: "stackoverflow";
  fromdate?: number;
  todate?: number;
  filter?: string;
}

const questions = {
  get: (params: IQuestionParams) => {
    const url = `${baseServiceUrl}`;
    return ServiceApi.get(url, { params }) as Promise<
      IRootResponse<IQuestionsResponse>
    >;
  },
};

export { questions };

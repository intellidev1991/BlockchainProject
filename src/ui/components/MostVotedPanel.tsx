/* eslint-disable */
import React, { useState, useEffect } from "react";
import {
  Button,
  Panel,
  Placeholder,
  List,
  PanelGroup,
  Divider,
  Pagination,
  Form,
  SelectPicker,
  TagInput,
  InputGroup,
  Input,
  DateRangePicker,
  Table,
  Modal,
} from "rsuite";
import { Api } from "../../core/api";
import { useChangeTitle } from "../../core/hooks/useChangeTitle";
import { IQuestionItem, ORDER, SORT } from "../../core/interfaces";
import ReactTagInput from "@pathofdev/react-tag-input";
import Search from "@rsuite/icons/Search";
import moment from "moment";
import * as dateFns from "date-fns";
import { Cell, Column, HeaderCell } from "rsuite-table";
import { useMediaQuery } from "react-responsive";

moment.updateLocale("en", {
  week: {
    dow: 0, // 0 to 6 sunday to saturday
  },
});
const _times = {
  //than get current week or get last week according to Sun -- Sat
  "This Week": [
    moment().startOf("week").toDate(),
    moment().endOf("week").toDate(),
  ],
  "Last Week": [
    moment().startOf("week").subtract(7, "days").toDate(),
    moment().endOf("week").subtract(7, "days").toDate(),
  ],
  today: [moment().startOf("day").toDate(), moment().endOf("day").toDate()],
};

const { Paragraph } = Placeholder;

interface IMostVotedPanelProps {
  onClick?: (item: IQuestionItem) => void;
  autoHeight?: boolean;
}

const MostVotedPanel: React.FC<IMostVotedPanelProps> = React.memo(
  ({ onClick, autoHeight = false }) => {
    const isMobile = useMediaQuery({
      query: "(max-width: 405px)",
    });
    const [loading, setLoading] = useState(false);
    const [has_more, setHas_more] = useState(false);
    const [questionsData, setQuestionsData] = useState<IQuestionItem[]>([]);
    const [dateRange, setDateRange] = useState(_times["Last Week"]);
    //--options
    const [page, setPage] = useState(1);
    const [pagesize, setPagesize] = useState(10);
    const [sort, setSort] = useState<SORT>("votes");
    const [order, setOrder] = useState<ORDER>("desc");
    const [tagged, setTagged] = useState(["android"]);

    //-- default filter items
    const def_pagesize = [
      {
        label: "10 per page",
        value: 10,
      },
      {
        label: "20 per page",
        value: 20,
      },
      {
        label: "30 per page",
        value: 30,
      },
    ];
    const def_sort_by = [
      //order
      {
        label: "Higher",
        value: "desc",
      },
      {
        label: "Lower",
        value: "asc",
      },
    ];

    useEffect(() => {
      fetchQuestions();
    }, [page, pagesize, sort, order, tagged, dateRange]);

    const fetchQuestions = async () => {
      setLoading(true);

      try {
        //to fix select today range
        let _fromdate =
          findSelectedDateRangeName() === "Today"
            ? moment(_times["today"][0]).unix()
            : moment(dateRange[0]).unix();
        let _todate =
          findSelectedDateRangeName() === "Today"
            ? moment(_times["today"][1]).unix()
            : moment(dateRange[1]).unix();

        const res = await Api.questions.get({
          page: page,
          pagesize: pagesize,
          sort: sort,
          order: order,
          tagged: tagged.join(";"),
          site: "stackoverflow",
          fromdate: _fromdate,
          todate: _todate,
          filter: "!6VvPDzO8siz87", //add body_markdown & up_vote_count fields
        });
        const { data } = res;
        console.log("res", data);
        setQuestionsData(data.items);
        setHas_more(data.has_more);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    const findSelectedDateRangeName = () => {
      if (!dateRange) return "-";
      let last7days = [dateFns.subDays(new Date(), 6), new Date()];

      let this_time1 = moment(_times["This Week"][0]).format("DDMMYYYY");
      let this_time2 = moment(_times["This Week"][1]).format("DDMMYYYY");
      let last_time1 = moment(_times["Last Week"][0]).format("DDMMYYYY");
      let last_time2 = moment(_times["Last Week"][1]).format("DDMMYYYY");
      let last7days1 = moment(last7days[0]).format("DDMMYYYY");
      let last7days2 = moment(last7days[1]).format("DDMMYYYY");
      let today1 = moment(_times["today"][0]).format("DDMMYYYY");
      let today2 = moment(_times["today"][0]).format("DDMMYYYY");
      //--dates from date range
      let t1 = moment(dateRange[0]).format("DDMMYYYY");
      let t2 = moment(dateRange[1]).format("DDMMYYYY");

      if (t1 === last_time1 && t2 === last_time2) return "Last week";
      else if (t1 === this_time1 && t2 === this_time2) return "This week";
      else if (t1 === last7days1 && t2 === last7days2) return "Last 7 days";
      else if (t1 === today1 && t2 === today2) return "Today";
      else return "Custom";
    };
    return (
      <div>
        <Panel
          header={
            <div className="text-xl font-bold">
              {`Most voted ${
                tagged.length > 0 ? `[ ${tagged.join(" & ")} ] related` : "all"
              } questions`}
            </div>
          }
          shaded
          defaultExpanded
        >
          <Panel bordered className="mb-4 bg-gray-50">
            <Form layout="inline">
              <Form.Group>
                <Form.ControlLabel>Items:</Form.ControlLabel>
                <SelectPicker
                  cleanable={false}
                  searchable={false}
                  value={pagesize}
                  onChange={(v) => {
                    setPagesize(Number.parseInt(v.toString()));
                    setPage(1);
                  }}
                  data={def_pagesize}
                  style={{ width: 120 }}
                />
              </Form.Group>

              <Form.Group>
                <Form.ControlLabel>Sort:</Form.ControlLabel>
                <SelectPicker
                  cleanable={false}
                  searchable={false}
                  value={order}
                  onChange={(v) => {
                    //@ts-ignore
                    setOrder(v);
                    setPage(1);
                  }}
                  data={def_sort_by}
                  style={{ width: 120 }}
                />
              </Form.Group>

              <Form.ControlLabel>Search:</Form.ControlLabel>
              <Form.Group style={{ width: isMobile ? 270 : 300 }}>
                <ReactTagInput
                  tags={tagged}
                  onChange={(newTags) => {
                    setTagged(newTags);
                    setPage(1);
                  }}
                  placeholder="Type and press enter"
                  maxTags={4}
                  removeOnBackspace={true}
                />
              </Form.Group>

              <Form.Group>
                <Form.ControlLabel>{`Date (${findSelectedDateRangeName()}):`}</Form.ControlLabel>

                <DateRangePicker
                  cleanable={false}
                  className=""
                  //@ts-ignore
                  value={dateRange}
                  onChange={(value) => {
                    //@ts-ignore
                    setDateRange(value);
                    setPage(1);
                  }}
                  showOneCalendar={false}
                  locale={{
                    sunday: "Su",
                    monday: "Mo",
                    tuesday: "Tu",
                    wednesday: "We",
                    thursday: "Th",
                    friday: "Fr",
                    saturday: "Sa",
                    ok: "Confirm",
                  }}
                  ranges={[
                    {
                      label: "Last week",
                      //@ts-ignore
                      value: _times["Last Week"],
                    },
                    {
                      label: "Last 7 days",
                      value: [dateFns.subDays(new Date(), 6), new Date()],
                    },
                    {
                      label: "Today",
                      //@ts-ignore
                      value: _times["today"],
                    },
                    {
                      label: "This week",
                      //@ts-ignore
                      value: _times["This Week"],
                    },
                  ]}
                />
              </Form.Group>
            </Form>
          </Panel>
          {loading ? (
            <Paragraph style={{ marginTop: 30 }} rows={5} active />
          ) : (
            <>
              {questionsData.length > 0 && (
                <Table
                  height={!autoHeight ? 520 : undefined}
                  autoHeight={autoHeight}
                  wordWrap
                  loading={loading}
                  affixHeader
                  affixHorizontalScrollbar
                  rowClassName={"cursor-pointer"}
                  data={questionsData}
                  onRowClick={(rowData) => {
                    if (onClick) onClick(rowData as IQuestionItem);
                  }}
                >
                  <Column width={50}>
                    <HeaderCell>#</HeaderCell>
                    <Cell>
                      {(rowData, index) => index + pagesize * (page - 1) + 1}
                    </Cell>
                  </Column>

                  <Column flexGrow={3} minWidth={200}>
                    <HeaderCell>Title</HeaderCell>
                    <Cell dataKey="title" />
                  </Column>

                  <Column flexGrow={1} minWidth={100} align="center">
                    <HeaderCell>Up vote count</HeaderCell>
                    <Cell>
                      {(rowData) => (
                        <span className="text-green-800 font-semibold">
                          {rowData?.up_vote_count}
                        </span>
                      )}
                    </Cell>
                  </Column>

                  <Column flexGrow={2} minWidth={150}>
                    <HeaderCell>Created at</HeaderCell>
                    <Cell>
                      {(rowData) => (
                        <span className="text-pink-700">
                          {moment.unix(rowData.creation_date).format("LLL")}
                        </span>
                      )}
                    </Cell>
                  </Column>
                </Table>
              )}
              {questionsData.length === 0 && (
                <div className="w-full flex flex-row justify-center items-center font-semibold text-lg">
                  There is no more data
                </div>
              )}
              <Divider />
              <Pagination
                prev
                last
                next
                first
                size="sm"
                total={1000}
                limit={pagesize}
                maxButtons={5}
                activePage={page}
                onChangePage={setPage}
              />
            </>
          )}
        </Panel>
      </div>
    );
  }
);

export { MostVotedPanel };

const styles = {};

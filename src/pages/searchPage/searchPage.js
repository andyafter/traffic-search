import React, { Component } from "react";

import {
  Input,
  Card,
  Typography,
  Timeline,
  Radio,
  Button,
  Collapse,
  message,
  Divider,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Service from "../../service/search";

import "./searchPage.css";

const { Paragraph } = Typography;
const { Panel } = Collapse;

class SearchPage extends Component {
  state = {
    routerList: [],
    startValue: "",
    endValue: "",
    tab: "distance",
  };

  componentDidMount() {}
  //请求列表数据
  getList = async (params) => {
    const { suggest_routes, result, msg } = await Service.getList(params);

    if (result == "success") {
      this.setState({
        routerList: suggest_routes,
      });
    } else {
      message.error(`${msg}`);
    }
  };

  search = () => {
    const { startValue, endValue, tab } = this.state;
    if (!startValue || !endValue) {
      message.info("please input!");
      return;
    }
    let params = {
      from: startValue,
      to: endValue,
      tab: tab,
    };
    this.getList(params);
  };
  render() {
    const { routerList, tab } = this.state;
    return (
      <div style={{ padding: 20 }}>
        <Card
          title={
            <>
              <Input
                placeholder="Start"
                style={{ width: 200 }}
                onChange={(e) => this.setState({ startValue: e.target.value })}
              />
              <span> TO </span>
              <Input
                placeholder="End"
                style={{ width: 200 }}
                onChange={(e) => this.setState({ endValue: e.target.value })}
              />
              <div style={{ marginLeft: 10, display: "inline-block" }}>
                <Button
                  type="primary"
                  shape="circle"
                  onClick={this.search}
                  icon={<SearchOutlined />}
                />
                <Radio.Group
                  value={tab}
                  style={{ marginLeft: 20 }}
                  size="small"
                  onChange={(e) =>
                    this.setState({ tab: e.target.value }, () => {
                      this.search();
                    })
                  }
                >
                  <Radio.Button value="distance">distance</Radio.Button>
                  <Radio.Button value="time">time</Radio.Button>
                </Radio.Group>
              </div>
            </>
          }
          bordered={false}
          style={{ width: "100%" }}
        >
          <div className="routers-detail">
            <Collapse accordion>
              {routerList.map((item, index) => {
                const routers = item.routes;
                return (
                  <Panel
                    header={
                      <div>
                        <span>{`line${index + 1}`}</span>
                        <Divider type="vertical" />
                        <span>{`${item.total_cost} minutes`}</span>
                      </div>
                    }
                    key={index}
                  >
                    <Typography>
                      <Paragraph>{item.summary}</Paragraph>
                    </Typography>
                    <Timeline mode={"left"}>
                      {routers.map((e, i) => {
                        let stations = e.take_stations;
                        return stations.map((el, j) => {
                          // 判断换乘站
                          return j == stations.length - 1 &&
                            i != routers.length - 1 ? (
                            <Timeline.Item label={el.code}>
                              <p>{el.name}</p>
                              <p>
                                <span style={{ background: "#E7EEFF" }}>
                                  Transfer
                                </span>
                              </p>
                            </Timeline.Item>
                          ) : (
                            <Timeline.Item label={el.code}>
                              {el.name}
                            </Timeline.Item>
                          );
                        });
                      })}
                    </Timeline>
                  </Panel>
                );
              })}
            </Collapse>
          </div>
        </Card>
      </div>
    );
  }
}

export default SearchPage;

import { useEffect, useState } from "react";
import { InvestorDetailsDataType, InvestorDetailsProps } from "./types";
import { Col, Row, Segmented, Space, Table, TableProps, Tag, Typography } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { uniqueId } from "lodash";
import { COLOR_MAP, formatNumber } from "./utils";
const { Title, Link, Text } = Typography;


export default function InvestorDetails({ investor, onClose }: InvestorDetailsProps) {
  const [details, setDetails] = useState<InvestorDetailsDataType[]>([]);
  const [assetClasses, setAssetClasses] = useState<InvestorDetailsDataType[]>([]);
  const [selectedAssetClass, setSelectedAssetClass] = useState<string>('All');

  useEffect(() => {
    if (investor.commitments) {
      const filterAssets = investor.commitments.reduce((acc: InvestorDetailsDataType[], item) => {
        const line = {
          key: uniqueId(),
          amount: item.amount,
          amountFormatted: formatNumber(item.amount),
          currency: item.currency,
          updatedDate: new Date(item.updatedDate),
        }
        if (!acc.find((i) => i.assetClass === 'All')) {
          acc.push({
            assetClass: 'All',
            ...line
          })
        } else {
          const index = acc.findIndex((i) => i.assetClass === 'All');
          acc[index].amount += item.amount;
          acc[index].amountFormatted = formatNumber(acc[index].amount);
        }
        if (!acc.find((i) => i.assetClass === item.assetClass)) {
          acc.push({
            assetClass: item.assetClass,
            ...line
          })
        } else {
          const index = acc.findIndex((i) => i.assetClass === item.assetClass);
          acc[index].amount += item.amount;
          acc[index].amountFormatted = formatNumber(acc[index].amount);
        }
        return acc;
      }, []);
      setAssetClasses(filterAssets);
    }
  }, [investor]);


  useEffect(() => {
    if (selectedAssetClass === 'All') {
      setDetails(investor.commitments || []);
    } else {
      setDetails(investor.commitments?.filter((item) => item.assetClass === selectedAssetClass) || []);
    }
  },[selectedAssetClass, investor.commitments]);



  const columns: TableProps<InvestorDetailsDataType>['columns'] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Asset Class',
      dataIndex: 'assetClass',
      key: 'assetClass',
      sorter: (a, b) => a.assetClass.localeCompare(b.assetClass),
      render: (_, { assetClass }) => (
        <Tag color={COLOR_MAP[assetClass]}>{assetClass}</Tag>
      ),
    },
    {
      title: 'Updated Date',
      key: 'updatedDate',
      dataIndex: 'updatedDate',
      render: (_, { updatedDate }) => (
        <>{new Date(updatedDate).toLocaleDateString()}</>
      )
    },
    {
      title: 'Currency',
      key: 'currency',
      dataIndex: 'currency',
    },
    {
      title: 'Amount',
      key: 'amount',
      render: (_, { amount }) => (
        <>{formatNumber(amount)}</>
      ),
      sorter: (a, b) => a.amount - b.amount,
    },
    
  ];



  const renderTableView = () => {

    return (
      <Table<InvestorDetailsDataType> columns={columns} dataSource={details} size="middle" />
    )
  }

  return (
    <div>
      <Row>
        <Col span={9}>
          <Title level={4}>
            <Space>
              <Link onClick={onClose}>
                <ArrowLeftOutlined />
              </Link>
              Investor Commitments
              <Text type="secondary">{investor.name}</Text>
            </Space>
          </Title>
        </Col>
        <Col span={15}>
          <Segmented
            value={selectedAssetClass}
            onChange={(value) => setSelectedAssetClass(value)}
            options={
              assetClasses.map((item) => ({
                value: item.assetClass,
                label: (
                  <div style={{ padding: 2 }}>
                    <Row justify="center">
                      <Text strong>{item.assetClass}</Text>
                    </Row>
                    <Row justify="center">
                      <Text type="secondary">
                        <small>
                          {item.currency} {item.amountFormatted}
                        </small>
                      </Text>
                    </Row>
                  </div>
                )
              }))
            }
          ></Segmented>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          {renderTableView()}
        </Col>
      </Row>
    </div>
  )
}

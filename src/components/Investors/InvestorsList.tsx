import { theme, Table, Typography } from 'antd';
import type { TableProps } from 'antd';
import { useEffect, useState } from 'react';
import mockData from './formatted-data.json';
import InvestorDetails from './InvestorDetails';
import { InvestorDataType } from './types';
import { formatNumber } from './utils';
const { Title } = Typography





export default function InvestorsList() {
    const [data, setData] = useState<InvestorDataType[]>([]);
    const [selectedInvestor, setSelectedInvestor] = useState<InvestorDataType | null>(null);

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const fetchData = async () => {
        try {
            // Fetch data from API
            const response = await fetch('http://localhost:5288/api/Investors');
            const apiData = await response.json();
            // setData(apiData as unknown as InvestorDataType[]);
            setData(apiData as InvestorDataType[]);
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    }


    useEffect(() => {
        fetchData();
    }, []);

    const columns: TableProps<InvestorDataType>['columns'] = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id'
            
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Added Date',
            key: 'createdDate',
            dataIndex: 'createdDate',
            render: (_, { createdDate }) => (
                <>{new Date(createdDate).toLocaleDateString()}</>
            ),
        },
        {
            title: 'Address',
            key: 'address',
            dataIndex: 'address',
            render: (_, { address }) => (
                <>{address}</>
            ),
        },
        {
            title: 'Total Commitment',
            key: 'totalCommitment',
            render: (_, {id, totalCommitment}) => <a
                onClick={() => {
                    const investor = data.find((item) => item.id === id);
                    if (investor) {
                        setSelectedInvestor(investor);
                    }
                }}
            >{formatNumber(totalCommitment)}</a>
        },
    ];

    const renderInvestorList = () => {
        return (<>
            <Title level={3}>Investors</Title>
            <Table<InvestorDataType> columns={columns} dataSource={data} size="middle" />
        </>)
    }
    return (
        <div
            style={{
                background: colorBgContainer,
                minHeight: '85vh',
                padding: 14,
                borderRadius: borderRadiusLG,
            }}
        >
            {selectedInvestor ? (<InvestorDetails
                investor={selectedInvestor}
                onClose={() => setSelectedInvestor(null)}
            />) : renderInvestorList()}
        </div>
    )
}

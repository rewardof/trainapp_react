import {Table} from "antd";
import Header from "./calculate-header";

const TableView = ({list, getResult, togglePage}) => {
    const columns = [
        {
            title: "T/R",
            dataIndex: "id",
            key: "id",
            render: (_, value) => list.indexOf(value) + 1,
        },
        {
            title: "Vagon raqami",
            dataIndex: "number_vagon",
        },
        {
            title: "Vagon turi",
            dataIndex: "vagon_type",
        },
        {
            title: "Yuk og'irligi",
            dataIndex: "load_weight",
            sorter: {
                compare: (a, b) => a.load_weight - b.load_weight,
                multiple: 6,
            },
        },
        {
            title: "Vagon og'irligi",
            dataIndex: "netto_vagon",
            sorter: {
                compare: (a, b) => a.netto_vagon - b.netto_vagon,
                multiple: 5,
            },
        },
        {
            title: "Vagon uzunligi",
            dataIndex: "length_vagon",
            sorter: {
                compare: (a, b) => a.length_vagon - b.length_vagon,
                multiple: 4,
            },
        },
        {
            title: "O'qlar soni",
            dataIndex: "number_of_arrow",
            sorter: {
                compare: (a, b) => a.number_of_arrow - b.number_of_arrow,
                multiple: 3,
            },
        },
        {
            title: "Umumiy og'irlik",
            dataIndex: "total_weight",
            sorter: {
                compare: (a, b) => a.total_weight - b.total_weight,
                multiple: 2,
            },
        },
        {
            title: "O'qqa tushadigan og'irlik",
            dataIndex: "bullet_weight",
            sorter: {
                compare: (a, b) => a.bullet_weight - b.bullet_weight,
                multiple: 1,
            },
        },
    ];

    return (
        <div>
            <div className="mb-5">
                <Header getResult={getResult} togglePage={togglePage}/>
            </div>
            <Table columns={columns} dataSource={list}/>
        </div>
    );
};

export default TableView;

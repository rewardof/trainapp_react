import { Table } from "antd";
import Header from "./result-header";

const TableView = ({
  locomotivs,
  togglePage,
  getData,
  data,
  relChar,
  relSwitch,
  visible,
  setVisible,
  distance,
  breakingTime,
}) => {
  const columns = [
    {
      title: "T/R",
      dataIndex: "id",
      key: "id",
      render: (_, value) => data?.indexOf(value) + 1,
      responsive: ["lg"],
      fixed: "left",
      align: "center",
      width: 40,
    },
    {
      title: "Tezlik",
      dataIndex: "capacity",
      responsive: ["lg"],
      width: 60,
      fixed: "left",
      align: "center",
    },
    {
      title:
        "Lokomotivning tortish rejimidagi harakatiga asosiy solishtirma qarshilik",
      dataIndex: "locomotiv_traction_mode",
      responsive: ["lg"],
      align: "center",
      width: 200,
    },
    {
      title:
        "Lokomotivning salt yurish rejimidagi harakatiga asosiy solishtirma qarshilik",
      dataIndex: "locomotiv_idle_mode",
      sorter: {
        compare: (a, b) => a.locomotiv_idle_mode - b.locomotiv_idle_mode,
        multiple: 5,
      },
      responsive: ["lg"],
      align: "center",
      width: 200,
    },
    {
      title: " Vagonlarning harakatiga asosiy solishtirma qarshilik",
      dataIndex: "total_resistance_vagon",
      sorter: {
        compare: (a, b) => a.total_resistance_vagon - b.total_resistance_vagon,
        multiple: 4,
      },
      responsive: ["lg"],
      align: "center",
      width: 200,
    },
    {
      title:
        " Manyovr tarkibining tortish rejimidagi harakatiga asosiy solishtirma qarshilik",
      dataIndex: "total_resistance_traction",
      sorter: {
        compare: (a, b) =>
          a.total_resistance_traction - b.total_resistance_traction,
        multiple: 3,
      },
      responsive: ["lg"],
      align: "center",
      width: 200,
    },
    {
      title:
        "Manyovr tarkibining salt yurish rejimidagi harakatiga asosiy solishtirma qarshilik",
      dataIndex: "total_resistance_idle",
      sorter: {
        compare: (a, b) => a.total_resistance_idle - b.total_resistance_idle,
        multiple: 2,
      },
      align: "center",
      width: 200,
    },

    // qo'shimcha qarshiliklar

    {
      title: "Nishablikning solishtirma qarshiligi",
      dataIndex: "declivity_resistance",
      sorter: {
        compare: (a, b) => a.declivity_resistance - b.declivity_resistance,
        multiple: 2,
      },
      align: "center",
      width: 130,
    },

    {
      title: "Egrilikning solishtirma qarshiligi",
      dataIndex: "curvature_resistance",
      sorter: {
        compare: (a, b) => a.curvature_resistance - b.curvature_resistance,
        multiple: 2,
      },
      align: "center",
      width: 130,
    },

    {
      title: "Strelkali o’tkazgichlarning solishtirma qarshiligi",
      dataIndex: "switch_curvature_resistance",
      sorter: {
        compare: (a, b) =>
          a.switch_curvature_resistance - b.switch_curvature_resistance,
        multiple: 2,
      },
      align: "center",
      width: 200,
    },

    {
      title: "Past haroratning solishtirma qarshiligi",
      dataIndex: "outside_temperature_resistance",
      sorter: {
        compare: (a, b) =>
          a.outside_temperature_resistance - b.outside_temperature_resistance,
        multiple: 2,
      },
      align: "center",
      width: 170,
    },

    {
      title:
        "Harakatga qarama-qarshi va yon tomondan shamolning solishtirma qarshiligi",
      dataIndex: "wind_capacity_resistance",
      sorter: {
        compare: (a, b) =>
          a.wind_capacity_resistance - b.wind_capacity_resistance,
        multiple: 2,
      },
      align: "center",
      width: 230,
    },

    {
      title: "Vagonlar bilan oldinda harakatlangandagi solishtirma qarshilik",
      dataIndex: "resistance_vagon_ahead",
      sorter: {
        compare: (a, b) => a.resistance_vagon_ahead - b.resistance_vagon_ahead,
        multiple: 2,
      },
      align: "center",
      width: 200,
    },

    {
      title: "Yo’l holatining solishtirma qarshiligi",
      dataIndex: "railroad_condition_resistance",
      sorter: {
        compare: (a, b) =>
          a.railroad_condition_resistance - b.railroad_condition_resistance,
        multiple: 2,
      },
      align: "center",
      width: 170,
    },

    {
      title:
        "Manoyvr tarkibining tortish rejimidagi harakatiga umumiy qarshilik",
      dataIndex: "all_traction_resistance",
      sorter: {
        compare: (a, b) =>
          a.all_traction_resistance - b.all_traction_resistance,
        multiple: 2,
      },
      align: "center",
      width: 230,
    },

    {
      title:
        "Manyovr tarkibining tortish rejimidagi harakatiga solishtirma qarshilik",
      dataIndex: "specific_traction_resistance",
      sorter: {
        compare: (a, b) =>
          a.specific_traction_resistance - b.specific_traction_resistance,
        multiple: 2,
      },
      align: "center",
      width: 230,
    },

    {
      title: "Manyovr tarkibining salt rejimidagi harakatiga umumiy qarshilik",
      dataIndex: "all_idle_resistance",
      sorter: {
        compare: (a, b) => a.all_idle_resistance - b.all_idle_resistance,
        multiple: 2,
      },
      align: "center",
      width: 200,
    },

    {
      title:
        "Manyovr tarkibining salt rejimidagi harakatiga solishtirma qarshilik",
      dataIndex: "specific_idle_resistance",
      sorter: {
        compare: (a, b) =>
          a.specific_idle_resistance - b.specific_idle_resistance,
        multiple: 2,
      },
      align: "center",
      width: 230,
    },
  ];
  return (
    <div>
      <div className="mb-5">
        <Header
          togglePage={togglePage}
          locomotivs={locomotivs}
          getData={getData}
          relSwitch={relSwitch}
          relChar={relChar}
          visible={visible}
          setVisible={setVisible}
          distance={distance}
          breakingTime={breakingTime}
        />
      </div>
      <Table
        columns={columns}
        dataSource={data}
        sticky
        size="middle"
        scroll={{ x: "calc(3000px + 50%)", y: 500 }}
      />
    </div>
  );
};

export default TableView;

import React from 'react';
import { Link } from 'react-router-dom';
import UilPrint from '@iconscout/react-unicons/icons/uil-print';
import UilBookOpen from '@iconscout/react-unicons/icons/uil-book-open';
import UilFileAlt from '@iconscout/react-unicons/icons/uil-file-alt';
import UilFile from '@iconscout/react-unicons/icons/uil-file';
import UilTimes from '@iconscout/react-unicons/icons/uil-times';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import DoughnutChart from '../../../../components/charts/DoughnutChart';
import { PerfomanceOverviewStyle } from '../../Style';
import { BorderLessHeading, ChartPointHorizontal } from '../../../styled';

const StudentAttendanceOverview = React.memo(() => {
  const labels = ['Attended', 'Missed'];

  const options = {
    cutout: 70,
    maintainAspectRatio: false,
    responsive: false,
    borderWidth: 2,
    borderColor: 'transparent',
    plugins: {
      legend: {
        display: false,
      },
    },
    tooltips: {},
  };

  const datasets = [
    {
      data: [50, 50],
      backgroundColor: ['#097937', '#d54d4d'],
      centerText: '50%',
      centerTextLabel: '5/10',
    },
  ];

  return (
    <BorderLessHeading>
      <Cards title="Attendance" size="large">
        <PerfomanceOverviewStyle>
          <DoughnutChart labels={labels} datasets={datasets} width={180} height={180} option={options} />
          <ChartPointHorizontal>
            <div className="ninjadash-chartpoint">
              {datasets[0].data.map((value, index) => {
                return (
                  <div className="ninjadash-chartpoint__item" key={index}>
                    <span
                      className="ninjadash-chartpoint__tika"
                      style={{
                        backgroundColor: datasets[0].backgroundColor[index],
                      }}
                    />
                    <span className="ninjadash-chartpoint__label">{labels[index]}</span>
                  </div>
                );
              })}
            </div>
          </ChartPointHorizontal>
        </PerfomanceOverviewStyle>
      </Cards>
    </BorderLessHeading>
  );
});

export default StudentAttendanceOverview;

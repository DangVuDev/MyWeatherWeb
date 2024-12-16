import React, { useState } from 'react';
import axios from 'axios';
import './Home.css';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleSearch = async () => {
    setError('');
    if (!city) {
      setError('Please enter city name!');
      return;
    }
//https://myweatherapi-4fcs.onrender.com
//http://localhost:5237
    try {
      const response = await axios.get(`https://myweatherapi-4fcs.onrender.com/api/get-weather-at?city=${city}`);
      setWeather(response.data);
    } catch (err) {
      setError('Unable to get weather information, please try again!');
      console.error(err);
    }
  };

  const getWeatherIcon = (weatherCondition, time) => {
    let isDay = true;  // Sử dụng let để thay đổi giá trị
    if (!weatherCondition) return '';  // Kiểm tra nếu weatherCondition là null hoặc undefined

    // Kiểm tra thời gian và cập nhật trạng thái ban ngày/buổi tối
    if (time != null) {
        const [hour] = time.split(':'); // Tách chuỗi theo dấu ":" và lấy phần giờ
        time = parseInt(hour, 10);  // Chuyển giờ sang kiểu số
        isDay = time >= 6 && time < 18;  // Nếu thời gian từ 6h đến 18h là ban ngày
    }

    // Mã hóa điều kiện thời tiết thành biểu tượng tương ứng
    const iconMapping = {
        day: {
            'clear sky': '🌞',
            'few clouds': '🌤️',
            'scattered clouds': '⛅',
            'broken clouds': '☁️',
            'overcast clouds': '☁️',
            'light rain': '🌧️',
            'moderate rain': '🌧️',
            'heavy intensity rain': '🌧️',
            'very heavy rain': '🌧️',
            'extreme rain': '🌧️',
            'freezing rain': '🌨️',
            'light snow': '❄️',
            'snow': '❄️',
            'heavy snow': '❄️',
            'sleet': '❄️',
            'light shower sleet': '❄️',
            'shower sleet': '❄️',
            'thunderstorm': '🌩️',
            'mist': '🌫️',
            'fog': '🌫️',
            'haze': '🌫️',
            'smoke': '💨',
            'dust': '🌪️',
            'sand': '🌪️',
            'sand/dust whirls': '🌪️',
            'volcanic ash': '🌋',
            'squalls': '💨',
            'tornado': '🌪️',
            'default': '🌞'
        },
        night: {
            'clear sky': '🌕',
            'few clouds': '🌙',
            'scattered clouds': '🌙',
            'broken clouds': '☁️',
            'overcast clouds': '☁️',
            'light rain': '🌧️',
            'moderate rain': '🌧️',
            'heavy intensity rain': '🌧️',
            'very heavy rain': '🌧️',
            'extreme rain': '🌧️',
            'freezing rain': '❄️',
            'light snow': '❄️',
            'snow': '❄️',
            'heavy snow': '❄️',
            'sleet': '❄️',
            'light shower sleet': '❄️',
            'shower sleet': '❄️',
            'thunderstorm': '🌩️',
            'mist': '🌫️',
            'fog': '🌫️',
            'haze': '🌫️',
            'smoke': '💨',
            'dust': '🌪️',
            'sand': '🌪️',
            'sand/dust whirls': '🌪️',
            'volcanic ash': '🌋',
            'squalls': '💨',
            'tornado': '🌪️',
            'default': '🌙'
        }
    };

    const weatherIcons = isDay ? iconMapping.day : iconMapping.night;

    // Trả về biểu tượng tương ứng, nếu không có sẽ trả về biểu tượng mặc định
    return weatherIcons[weatherCondition.toLowerCase()] || weatherIcons['default'];
};


const getWeekday = (date) => {
  if (!date) return ''; // Kiểm tra xem date có hợp lệ không

  // Chuyển đổi chuỗi DD/MM/YYYY thành đối tượng Date
  const [day, month, year] = date.split('/').map(Number);
  const parsedDate = new Date(year, month - 1, day); // Lưu ý: Tháng trong Date bắt đầu từ 0

  if (isNaN(parsedDate)) return ''; // Kiểm tra xem ngày tháng có hợp lệ không

  // Mảng các thứ trong tuần
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const dayOfWeek = parsedDate.getDay(); // Lấy thứ trong tuần (0 - 6)

  return days[dayOfWeek]; // Trả về thứ trong tuần
};

  // Hàm để định dạng ngày tháng
const formatDate = (date) => {
  if (!date) return ''; // Kiểm tra xem date có hợp lệ không
  
  // Chuyển đổi chuỗi DD/MM/YYYY thành đối tượng Date
  const [day, month, year] = date.split('/').map(Number);
  const parsedDate = new Date(year, month - 1, day); // Lưu ý: Tháng trong Date bắt đầu từ 0
  
  if (isNaN(parsedDate)) return ''; // Kiểm tra xem ngày tháng có hợp lệ không

  // Định dạng ngày tháng theo yêu cầu
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return parsedDate.toLocaleDateString("en-US", options);
};
  // Hàm trả về bộ màu tương ứng với nhiệt độ
// Hàm trả về bộ màu tương ứng với nhiệt độ
const getColorByTemperature = (temp) => {
  const temperatureColors = {
    // Cực lạnh (-10 đến -5)
    '-10': '#0277bd', '-9': '#0277bd', '-8': '#0277bd', '-7': '#0277bd', '-6': '#0277bd', '-5': '#0288d1',
  
    // Rất lạnh (-4 đến 0)
    '-4': '#0288d1', '-3': '#0288d1', '-2': '#0288d1', '-1': '#0288d1', '0': '#2196f3',
  
    // Lạnh đậm (1 đến 5)
    '1': '#388e3c', '2': '#388e3c', '3': '#388e3c', '4': '#388e3c', '5': '#388e3c',
  
    // Lạnh (6 đến 10)
    '6': '#8bc34a', '7': '#8bc34a', '8': '#8bc34a', '9': '#8bc34a', '10': '#8bc34a',
  
    // Mát (11 đến 15)
    '11': '#cddc39', '12': '#cddc39', '13': '#cddc39', '14': '#cddc39', '15': '#cddc39',
  
    // Ấm (16 đến 20)
    '16': '#fbc02d', '17': '#fbc02d', '18': '#fbc02d', '19': '#fbc02d', '20': '#fbc02d',
  
    // Nóng (21 đến 25)
    '21': '#ff9800', '22': '#ff9800', '23': '#ff9800', '24': '#ff9800', '25': '#ff9800',
  
    // Rất nóng (26 đến 30)
    '26': '#f57c00', '27': '#f57c00', '28': '#f57c00', '29': '#f57c00', '30': '#f57c00',
  
    // Cực nóng (31 đến 45)
    '31': '#ff5722', '32': '#ff5722', '33': '#ff5722', '34': '#ff5722', '35': '#ff5722',
    '36': '#e53935', '37': '#e53935', '38': '#e53935', '39': '#e53935', '40': '#e53935',
    '41': '#d32f2f', '42': '#d32f2f', '43': '#d32f2f', '44': '#d32f2f', '45': '#b71c1c'
  };
  temp = parseInt(temp);
  // Kiểm tra nếu nhiệt độ có trong dictionary và trả về bộ màu
  if (temp < -10) {
    return temperatureColors['-10']; // Trả về màu cho nhiệt độ thấp nhất
  } else if(temp > 45){
    return temperatureColors['45']; // Trả về màu cho nhiệt độ cao nhất
  } else {
    return temperatureColors[temp] || '#ffffff'; // Trả về màu mặc định nếu không có nhiệt độ chính xác
  }
}
  // Hàm tính toán và thay đổi màu nền theo nhiệt độ
  const setBackgroundColorByTemperature = (temp1,temp2) => {
    // Đặt màu nền dựa trên nhiệt độ
    return `linear-gradient(45deg, ${getColorByTemperature(temp1)}, ${getColorByTemperature(temp2)})`; // Màu lạnh (xanh dương) 
  }
  const splitRange = (range) => {
    const [start, end] = range.split('-').map(Number); // Tách chuỗi và chuyển thành số
    return { start, end }; // Trả về một đối tượng chứa hai số
  };
  return (
    <div className="weather-app">
      <h1>Weather Forecast App</h1>
      
      <div className="search-box">
        <input
          type="text"
          value={city}
          onChange={handleCityChange}
          placeholder="Nhập tên thành phố..."
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {weather && (
        <div className="weather-info">
          <h2>
            <span className="city-name">{weather.city}</span>
            <span className="current-time">{weather.current.time}</span>
          </h2>

          {/* Thời tiết hiện tại */}
          <div className="current-weather" style={{ background: setBackgroundColorByTemperature(weather.current.temp, weather.current.temp) }}>
            <p className="temperature">{weather.current.temp}°C</p>
            <span className="weather-icon">{getWeatherIcon(weather.current.weather,weather.current.time)}</span>
          </div>
          {/* Dự báo theo giờ */}
          <div className="hourly-forecast">
            <h3>Hourly Forecast</h3>
            <div className="hourly-list">
              {weather.hourly.map((hour, index) => (
                <div key={index} className="hourly-item" style={{ background: setBackgroundColorByTemperature(hour.temp, hour.temp) }}>
                  <p className="hour-time">{hour.time}</p>
                  <span class="weather-icon">{getWeatherIcon(hour.weather,hour.time)}</span>
                  <p className="hour-temp">
                    {hour.temp}°C 
                  </p>
      
                </div>
              ))}
            </div>
          </div>

          {/* Dự báo theo ngày */}
          <div className="daily-forecast">
            <h3>Forecast for the next 5 days</h3>
            <div className="daily-list">
              {weather.daily.map((day, index) => (
                <div key={index} className="daily-item" style={{ background: setBackgroundColorByTemperature(parseInt(splitRange(day.temp).start), parseInt(splitRange(day.temp).end)) }}>
                  <p className="weekday">{getWeekday(day.date)}</p>  {/* Thêm thứ trong tuần */}
                  <p className="temperature">{splitRange(day.temp).start}°C   to  {splitRange(day.temp).end}°C</p>  {/* Nhiệt độ */}
                  <span className="weather-icon">{getWeatherIcon(day.weather,null)}</span>  {/* Biểu tượng thời tiết */}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;

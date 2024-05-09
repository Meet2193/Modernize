import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { interval } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  http = inject(HttpClient);
  // apiURL = 'http://localhost:8080/https://www.nseindia.com/api/equity-stockIndices?index=NIFTY%2050';
  apiURL = 'https://your-cors-anywhere-instance.netlify.app/https://www.nseindia.com/api/equity-stockIndices?index=NIFTY%2050';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Cookie':'_ga=GA1.1.1569350380.1714894657; _ga_QJZ4447QD3=GS1.1.1715097537.3.0.1715097568.0.0.0; nsit=VT7F29rA8VW6dkRk26H6q8vw; AKA_A2=A; _abck=234E8FA7564BEFA4F925E7408C9C0F0D~0~YAAQx/XSF6ssiUyPAQAA/4QjVgtrt46WckvPa8gvXuDt3e/n2mjuqj42zT29Y/E90RvStkmwyhG4nlZzHqWAersL99RWHwl1aUJywJp6DS92oYk32KhVKLV7I6vLUlLBudd2SQx97FE4ubcO1+LXXd9fhx4L+kFDFTZ0UgWMD6e/MrqsycSLTd2Yd7MiOeYgPGDG4ODHMILqTr2DHp+1JfESF+yXAags5fJR5obsyystEoSgaFN+qNj8IV5Pg8kwehYRQCKKXtDZzOxC1RQw8Z+Fwzz4l5eI9c7qz1VwTEez5IianqdijLaN5J3NMDvZh23BpbNPxsmrRq49Lel3cquV/jvNNig/ZitDcSvWWhyLR/x+fDSvqJQyJAgcHM1nRz3ASHAmq/Z1z5MAFyaH9Mbs60pehNzuHyU=~-1~-1~-1; bm_mi=5154C1F696C661C77CEF059EE6488BE9~YAAQx/XSF7MsiUyPAQAA9IYjVhcTmKwLandbYhlYaePkIAfeF8+9mAdAsWKPkNka5nDTri2bsTmwpUI9IujgPrTcS2xjWCEp76amv/Q5Reqb5WlE9GAdhkoibswJhJrTqfd/e1Z9kj3uExDT6peIcNkIRWYeIlcqLy6C7paaAeAi+ZshJg+n4Cs4+PLNgi6R+2j5kzMQgoKTUvk7BvHPZ2Kiu+u5rRTNwkyPcee9gBO6VjgfliLqXH1kCVUn1IluzZV52AcrDY3elE23qJzpQM7oiPwbLCeMggFHUWMjDj/99NxJGIzRuBR9sF4eBTJ9EAUkVFlCKGhcOZFVCg==~1; nseappid=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhcGkubnNlIiwiYXVkIjoiYXBpLm5zZSIsImlhdCI6MTcxNTEzNzEyOCwiZXhwIjoxNzE1MTQ0MzI4fQ.BmWWNsDkOJJsAvm-Cw5BeRhmilbqqgTC9hWfc8cVpf0; bm_sz=EAE64BE4E747420237A91F378022A0D1~YAAQx/XSF/AsiUyPAQAAZ6ojVhcFFW6ad50ep0E2qOiNyzq+uhbzMFaS7MdTshcMz0TvOmY6E5ch+hsHszNLG3NNwJxEt0ntTzEzbeBmD8/xHJy7NYxQQE184uJzAhnTfdWpVFTPUFx2PJWK8/lFJUHNnfmcFAGVvscbnGdD5qG+NS8ZSrCNaCxR6XJVVPyDvojun3lLvqNk+fonfnkPDtPQnDCsDhW1oQiCEy+r7pqPBPa7GFL3ImbML0hl64zvbylqBITYtmGLfS04WZp3xLzzmIU6O672PqVtuAEmNKdtKuM4vqNNzzcCuGFVJk0R3B/3f8sZ4xLxLy5aU5eav3BWNIqgdMSBYADRyWDD3xpBsYzYV/BfouNTI/Yy0TwMLXOc+u8JEcIcMaY57Ngn/p0D~4600628~3556407; ak_bmsc=01EE6F5D1349D68EA9C15CB5BEA6885B~000000000000000000000000000000~YAAQx/XSF/csiUyPAQAArasjVhedy7HAkZT1wTf7qVqJQQo9wczjbR3xVgz2RiRQii+cmzJIdvJ7NVTNQXfuQrodmlN+EjGjCP1ESH9KBV1Zs/0+sTmGQXNHxyUF0XBh/x2OGz2EAmagtfQnCdUMhP9hIwbbNqent+V6FY+TI7BFjdvo9fElt3MKiAdZNE5EU3i3/z1wjVx8RR0EDpI9nIlMYjj1YNbhCrl7kwpbcDReTJ/nnMb1109GIwkD+SKL9tt1Vp51DPrxCu3XELqpZqd1ZI8tNahsbAMvgRvQwqct48h23tH+abRfbJSFFlV/PtKovyyfpCtwevtuSr7Fp18umjOBZHK5u+HcrxVmcKO/iqCMeIAE9gm1T/N4g9W3UObc7P27jd9srqXlts1/GL/c39HQ4p3vtmqjD7gKOTDUUsFe2XQE/U+OokQTgUEELtbpAN7cGWhp2npOoKw1uKT1+LL4oZo07Z1YFa2jlBWY6T19AaSGsJC/TSQn31yAWTMfbg==; RT="z=1&dm=nseindia.com&si=762f425d-43ed-4763-8fd1-3b098ebaff2b&ss=lvx8d1p1&sl=0&se=8c&tt=0"; defaultLang=en; _ga_87M7PJ3R97=GS1.1.1715137149.4.1.1715137150.0.0.0; bm_sv=68E6B2A95BEFA165B4FD0D9D301E26D4~YAAQx/XSF5ktiUyPAQAAa/8jVhecg/54ETpPfpXy1GyGCtTpr2Sdmu9DejlODfdFDLZ/A1pRVeVDROexRGl1qdDt15C1xCSyxn+WFGRdxUiN/ocSf4AYeKW19oHGW2j/31yqwhGc/L/4u69eh53jmx54r+fabUUxMUI5DUfPKRnzAuUvsLeHhUG6ejvzcsHEm2akruwOPS085gY3jbOsTvdbosElMIsY4QvYuj0HWAQC67c3zTLjWxog0le1kwV81yo=~1',
  });

  constructor() {
    console.log('Initialize Service Filea');
    this.fetchLatestHeadersAndCookies();
  }

  // Method to fetch the latest headers and cookies from the third-party API
  fetchLatestHeadersAndCookies() {
    return this.http
      .get(`${this.apiURL}`, { observe: 'response' })
      .pipe(
        tap((response:any) => {
          // Assuming the response contains headers and cookies
          console.log('response of headers', response.data);
        })
      );
  }

  // Adjusted getAllData to use the stored headers
  getAllData() {
    return this.http.get<any>(this.apiURL);
  }

  fetchDataEveryMinute() {
    return interval(60000).pipe(switchMap(() => this.getAllData()));
  }
}

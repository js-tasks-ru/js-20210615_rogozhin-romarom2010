export default class ColumnChart {
  _chartHeight = 50;

  constructor(obj) {
    const {formatHeading, data, label, value, link} = obj ?? {};
    this.data = data;
    this.label = label;
    this.value = value;
    this.link = link;
    this.formatHeading = formatHeading;
    this.render();
  }

  get chartHeight() {
    return this._chartHeight;
  }

  set chartHeight(value) {
    if (value < 0) throw new Error("Отрицательное значение графика");
    this._chartHeight = value;
  }

  isLoading() {
    return !this.data || this.data.length === 0;
  }

  getColumnProps(data) {
    const maxValue = Math.max(...data);
    const scale = 50 / maxValue;

    return data.map(item => {
      return {
        percent: (item / maxValue * 100).toFixed(0) + '%',
        value: String(Math.floor(item * scale))
      };
    });
  }

  update(newData) {
    const bodyChart = this.element.querySelector('div.column-chart__chart');
    const childrens = bodyChart.children;
    for (let item of childrens) {
      item.remove();
    }
    const data = this.getColumnProps(newData);
    data.forEach(el => {
      const column = document.createElement('div');
      column.setAttribute('style', `--value: ${el.value}`);
      column.setAttribute('data-tooltip', el.percent);
      bodyChart.append(column);
    });
  }

  render() {
    const el = document.createElement('div');
    el.className = 'column-chart';
    el.setAttribute('style', `--chart-height: ${this._chartHeight}`);
    const header = document.createElement('div');
    header.className = 'column-chart__title';
    header.textContent = `${this.label ?? ''}`;
    if (this.link) {
      const link = document.createElement('a');
      link.className = 'column-chart__link';
      link.href = this.link;
      link.innerText = 'View all';
      header.append(link);
    }
    el.append(header);
    const body = document.createElement('div');
    body.className = 'column-chart__container';

    const bodyHeader = document.createElement('div');
    bodyHeader.className = 'column-chart__header';
    bodyHeader.setAttribute('data-element', 'header');
    if (this.formatHeading != null) {
      bodyHeader.textContent = this.formatHeading(this.value);
    } else {
      bodyHeader.textContent = this.value ?? '';
    }
    body.append(bodyHeader);
    const bodyChart = document.createElement('div');
    bodyChart.className = 'column-chart__chart';
    bodyChart.setAttribute('data-element', 'body');

    if (!this.isLoading()) {
      const bufData = this.getColumnProps(this.data);
      bufData.forEach(el => {
        const column = document.createElement('div');
        column.setAttribute('style', `--value: ${el.value}`);
        column.setAttribute('data-tooltip', el.percent);
        bodyChart.append(column);
      });
    } else {
      el.className = 'column-chart column-chart_loading';
    }
    body.append(bodyChart);

    el.append(body);
    this.element = el;
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
}

export default class ColumnChart {
  _chartHeight = 50;

  constructor({
                data = [],
                label = '',
                link = '',
                value = 0,
                formatHeading = data => data,
              } = {}) {
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
    this.bodyChart.innerHTML = '';
    const data = this.getColumnProps(newData);
    data.forEach(el => {
      const column = document.createElement('div');
      column.setAttribute('style', `--value: ${el.value}`);
      column.setAttribute('data-tooltip', el.percent);
      this.bodyChart.append(column);
    });
  }

  render() {
    const el = document.createElement('div');
    el.className = 'column-chart';
    el.setAttribute('style', `--chart-height: ${this._chartHeight}`);
    if (this.link) {
      el.innerHTML = `<div class="column-chart__title">${this.label ?? ''} <a class="column-chart__link" href=${this.link}>View all</a></div>`;
    } else {
      el.innerHTML = `<div class="column-chart__title">${this.label ?? ''}</div>`;
    }
    const body = document.createElement('div');
    body.className = 'column-chart__container';
    body.innerHTML = `<div data-element="header" class="column-chart__header">${this.formatHeading != null ? this.formatHeading(this.value) : this.value ?? ''}</div>
        <div data-element="body" class="column-chart__chart"></div>`;
    const bodyChart = body.querySelector('.column-chart__chart');
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
    this.bodyChart = bodyChart;
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

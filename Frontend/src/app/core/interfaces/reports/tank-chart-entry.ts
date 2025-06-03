export interface TankChartEntry {
  name: string; //nombre del tipo de tanque
  series: TankChartSeries[]
}
export interface TankChartSeries {
  name: string;//nombre del usuario
  value: number;
}

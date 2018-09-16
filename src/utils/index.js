// 距离单位换算
export function distanceRx(distance) {
	if (distance < 1000) {
		return distance + "m";
	} else if (distance >= 1000) {
		return (Math.round(distance / 100) / 10).toFixed(1) + "km"
	}
}

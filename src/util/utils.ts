import { goto } from '$app/navigation';

export function navigateTo(route: string): void {
	goto(route);
}
export function goBack() {
	window.history.back(); // 뒤로 가기 실행
}

export function leftPad(value: number) {
	if (value >= 10) {
		return value;
	}
	return `0${value}`;
}

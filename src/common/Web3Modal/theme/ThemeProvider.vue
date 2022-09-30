<script>
	import { theme } from "@/common/Web3Modal/theme";
	import { ThemeProvider } from "vue3-styled-component";
	export default {
		components: {
			ThemeProvider,
		},
		setup() {
			return {
				theme,
			};
		},
	};
</script>
<template>
	<ThemeProvider :theme="theme">
		<slot />
	</ThemeProvider>
</template>

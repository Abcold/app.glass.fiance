<template>
	<ButtonOutlined :disabled="disabled">
		<RowBetween>
			<div :style="{ display: 'flex', alignItems: 'center' }">
				<slot />
			</div>
			<ChevronDown :size="24" />
		</RowBetween>
	</ButtonOutlined>
</template>
<script>
	import { ChevronDownIcon as ChevronDown } from "@/common/Web3Modal/assets/icons";
	import { ButtonOutlined } from "../Button";
	export default {
		components: {
			ButtonOutlined,
			ChevronDown,
		},
		props: {
			disabled: {
				type: Boolean,
				default: false,
			},
		},
	};
</script>

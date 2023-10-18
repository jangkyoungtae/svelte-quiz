<script lang="ts" >
    export let onClick : Function = ()=>{console.log("클릭")};
    export let text : string ='';
    export let colors :string ='text-red'
    export let Icon :string;
</script>

<button class={"addBtn" +" "+colors} on:click={()=>onClick()} >
  <img src={Icon} alt="버튼" />{text}
</button>

<style>
  .addBtn {
		flex:1;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 15px;
		font-weight: 600;
		border-radius: 5px;
		white-space: nowrap;
		box-shadow: 0px 0px 10px #A8A29Edd;
		gap: 5px;
		background: linear-gradient(to bottom , #ffffff, #f8f8f8);;
		border: none;
		cursor: pointer;
	}
  .text-red{
    color: #EC551F;
  }
  .text-black{
    color: #000000;
  }
	.text-grey{
		color: #A8A29E;
	}
</style>
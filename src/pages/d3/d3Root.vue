<template>
    <div>
        <p>
            <router-link to="/d3/001">001</router-link>
            <router-link to="/d3/002">002</router-link>
            <router-link to="/d3/003">003</router-link>
            <router-link to="/d3/004">004</router-link>
            <router-link to="/d3/005">005</router-link>
            <router-link to="/d3/006">006</router-link>
            <router-link to="/d3/007">007</router-link>
            <router-link to="/d3/008">008</router-link>
            <router-link to="/d3/009">009</router-link>
            <router-link to="/d3/010">010</router-link>
            <router-link to="/d3/011">011</router-link>
            <router-link to="/d3/012">012</router-link>
            <router-link to="/d3/013">013</router-link>
            <router-link to="/d3/014">014</router-link>
        </p>
        <p>
            <router-link to="/d3/kline001">kline001</router-link>
            <router-link to="/d3/kline002">kline002</router-link>
            <router-link to="/d3/kline003">kline003</router-link>
            <router-link to="/d3/kline004">kline004</router-link>
        </p>
        <router-view/>
    </div>
</template>
<script>
export default {

}
</script>
<style>
a {
  color: #333;
}
[id^="d300"] {
  height: 500px;
}
#chart {
  height: 500px;
}
</style>


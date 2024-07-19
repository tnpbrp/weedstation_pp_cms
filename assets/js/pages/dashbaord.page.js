parasails.registerPage("dashboardpage", {
    name: "dashboardpage",
    props: {

    },
    data: {},
    computed: {},
    methods: {


    },
    beforeMount: function () { },
    mounted: function () {

        var ctx = document.getElementById('myChart').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['January', 'February', 'March', 'April', 'May'],
                datasets: [{
                    label: 'Sales',
                    data: [10, 20, 30, 25, 15],
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

    },
    watch: {},

});

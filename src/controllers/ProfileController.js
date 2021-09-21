const Profile = require('../model/Profile')

module.exports = {
        async index(req, res) {
            return res.render('profile', { profile: await Profile.get() })
        },

        async update(req, res) {
            // req.body para pegar os dados
            const data = req.body;
            // Definir quantas semanas tem no ano
            const weeksPerYear = 52
            // Remover as semanas de ferias no ano, para pegar quantas semana tem em um mês
            const weeksPerMonth = (weeksPerYear - data["vacation-per-year"] ) / 12
            // Definir quantas horas por semana estou trabalhando
            const weekTotalHours =  data["hours-per-day"] * data["days-per-week"]
            // Total de horas trabalhadas no mês
            const monthlyTotalHours = weekTotalHours * weeksPerMonth
            // Total da sua hora
            const valueHour = data["value-hours"] = data["monthly-budget"] / monthlyTotalHours

            const profile = await Profile.get()

            await Profile.update({
                ...profile,
                ...req.body,
                "value-hour": valueHour
            }) 

            return res.redirect('/profile')
        }
    }
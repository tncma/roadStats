var roadStatisfaction = {
	roads : [
		{
			id: 1000450300101,
			name: 'S P KANNUSAMY STREET', 
			type: 'ULB ROAD',
			contractor: 'SP_Contractor_1',
			cost: 100000,
			when:  '2000-JAN-10',
			feedback: [{mood: 'sad', type: 'speedbreaker-no-paint', text:'speedbreakers not painted'},
					   {mood: 'sad', type: 'speedbreaker-high-slope', text:'speedbreakers slope high, difficult'}]
		}, 
		{
			id: 1000450300103,
			name: 'VEDHAMBAL NAGAR', 
			type: 'ULB ROAD',
			contractor: 'VN_Contractor_2',
			cost: 200000,
			when:  '2000-JAN-10',
			feedback: [{mood: 'sad', type: 'speedbreaker-no-paint', text:'speedbreakers not painted'},
					   {mood: 'sad', type: 'speedbreaker-no-paint', text:'speedbreakers not painted'},
					   {mood: 'sad', type: 'speedbreaker-high-slope', text:'speedbreakers slope high, difficult'}]
		},
		{
			id: 1000450300118,
			name: 'LENIN NAGAR', 
			type: 'ULB ROAD',
			contractor: 'LN_Contractor_1',
			cost: 200000,
			when:  '2000-JAN-10',
			feedback: [{mood: 'happy', type: 'speedbreaker-visible', text:'speedbreaks painted well with yellow paint'},
					   {mood: 'sad', type: 'sewer-not-closed', text:'good road tarnished by sewer holes'}]
		}
	]
};

$(function(){
	var ro =	ko.mapping.fromJS(roadStatisfaction);
	ro.filteredRoads = ko.computed(function() {
		return _.sortBy(this.roads(), function(r){ return r.cost;});
	}, ro);
	_.each(ro.roads(), function(r){
		r.sadFeedBacks = ko.computed(function() {
			return _.filter(this.feedback(), function(f){ console.log('sdf'); return f.mood() == 'sad';});
		}, r);
		r.happyFeedBacks = ko.computed(function() {
			return _.filter(this.feedback(), function(f){ console.log('sdf'); return f.mood() == 'happy';});
		}, r);
		r.mood = ko.computed(function() {
			return this.sadFeedBacks().length > r.happyFeedBacks().length ? 'sad' : 'happy';
		}, r);
	});
    ko.applyBindings(ro, $("#container")[0]);
});
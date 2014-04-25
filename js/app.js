;(function($){
	var App = function(name) {
		// index for the current slide.
		this.currentIndex = 0;
		this.wrongAnswersCount = new Array;
		// slide data.
		this.appData = [
			{name:"Google", acceptable:["google","google.com"], imgs:["01_google_w.png", "01_google.png"], quote:"Try again? Here's a hint: This website's home page is so sparse because the founders did not know HTML and just wanted to create a quick interface.", value:"No"},
			{name:"Twitter", acceptable:["twitter","twitter.com"], imgs:["04_twitter_w.png", "04_twitter.png"], quote:"Try again? Here's a hint: The designers of this website reportedly posted on the design sharing site, Dribbble.", value:"No"},			
			{name:"Reddit", acceptable:["reddit","reddit.com"], imgs:["07_reddit_w.png", "07_reddit.png"], quote:"Try again? Here's a hint: In June 2005, this website was started by 22-year-old graduates of the University of Virginia: Steve Huffman and Alexis Ohanian. They set out to create \"The front page of the Internet.\"", value:"No"},
			{name:"Imgur", acceptable:["imgur","imgur.com"], imgs:["08_imgur_w.png", "08_imgur.png"], quote:"Try again? Here's a hint: This website was conceived as a side project for \"an image-hosting service that doesn't suck\" by Alan Schaaf, then a computer science student at Ohio University, who was fed up with the slow, laborious and limited image-hosting solutions available at the time.", value:"No"},			
			{name:"Instagram", acceptable:["instagram","instagram.com"], imgs:["11_instagram_w.png", "11_instagram.png"], quote:"Try again? Here's a hint: Kevin Systrom, co-founder of this company, designed the company\'s well-known icon from scratch using Photoshop.", value:"No"},
			{name:"Apple", acceptable:["apple","apple.com"], imgs:["02_apple_w.png", "02_apple.png"], quote:"Try again? Here's a hint: The first logo for this company featured Isaac Newton.", value:"No"},
			{name:"Amazon", acceptable:["amazon","amazon.com"], imgs:["09_amazon_w.png", "09_amazon.png"], quote:"Try again? Here's a hint: The logo cleverly depicts a smile going from A to Z. This signifies that the company is willing to deliver everything to everyone, anywhere in the world.", value:"No"},
			{name:"Ebay", acceptable:["ebay","ebay.com"], imgs:["10_ebay_w.png", "10_ebay.png"], quote:"Try again? Here's a hint: Inspired by the visual imagery behind Eastman Kodak and Apple, among other brands, this company created a logo that would appeal to the masses. The final result was the multi-colored logo in overlapping letters with baseline shifts. The logo was chosen out of five or six other designs and had the \"friendly, open and accessible\" personality that the team was looking for.", value:"No"},			
			{name:"NewYorkTimes", acceptable:["new york times","ny times", "nytimes", "newyorktimes.com", "nytimes.com"], imgs:["03_nyt_w.png", "03_nyt.png"], quote:"Try again? Here's a hint: In 1869, Maria Morgan was the first woman reporter in this company to have a desk in a newsroom. She covered cattle news, horse shows, and racing.", value:"No"},
			{name:"Groupon", acceptable:["groupon","groupon.com"], imgs:["05_groupon_w.png", "05_groupon.png"], quote:"Try again? Here's a hint: This company launched their first website with WordPress and the first deal was a half-price offer for pizzas for the restaurant on the first floor of its building in Chicago.", value:"No"},
			{name:"Grubhub", acceptable:["grubhub","grubhub.com"], imgs:["06_grubhub_w.png", "06_grubhub.png"], quote:"Try again? Here's a hint: \"Mike and I aren't artists,\" says Maloney. \"I can't draw for $%&*. So we had to hire somebody and put some graphics together to bring more diners and restaurants to [our site].\"", value:"No"},
			{name:"Threadless", acceptable:["threadless","threadless.com"], imgs:["12_threadless_w.png", "12_threadless.png"], quote:"Try again? Here's a hint: Shortly after their first batch of shirts were printed, the founders built a website and introduced a voting system where designs could be scored 1 to 5.", value:"No"}
		];
		// go to next slide
		this.nextSlide = function(){
			var newIndex = this.currentIndex + 1;
			if(newIndex > this.appData.length-1){
				this.showEndScreen();
			}else{
				this.presentSlide(newIndex);
				this.showGuessForm();
			}
		};
		// show the slide.
		this.presentSlide = function(index){			
			if(index < 0 || index > this.appData.length-1) return;
			this.currentIndex = index;
			this.wrongAnswersCount[this.currentIndex] = 0;
			$("#img_container").html( "<img src='./images/"+this.appData[this.currentIndex].imgs[0]+"' />");
			// show the pagination
			$("#website_number").html( this.currentIndex+1 );
			// clear the feedback
			$("#feedback").html("");
			$("#feedback").css("display","none");
			//
			$("#website_name").val("");
		};
		// advance to second screen of slide
		this.advanceSlide = function(){
			$("#img_container").html( "<img src='./images/"+this.appData[this.currentIndex].imgs[1]+"' />");
			this.showNextButton();
		};
		// submit user answer.
		this.submitAnswer = function(answer) {
			var answer = answer.toLowerCase();
			var correct = false;
			var acceptables = this.appData[this.currentIndex].acceptable;
			var n = acceptables.length;
			for(var i=0; i<n; i++) if(answer == acceptables[i]) correct=true;			
			if(correct){
				this.appData[this.currentIndex].value="Yes";
				this.advanceSlide();
			}else{
				this.wrongAnswersCount[this.currentIndex]++;
				var msg = "<h2>Wrong answer!</h2> <br/>"+this.appData[this.currentIndex].quote;
				if( this.wrongAnswersCount[this.currentIndex] > 1 ) msg =  "<h2>Wrong answer!</h2> <br/>"+this.getRandomBanter();
				this.showFeedbackAlert( msg );
			}
		};
		// show the next button, hide the form submission
		this.showNextButton = function(){
			if(this.currentIndex == this.appData.length-1){
				$("#next-button").html("Congrats! Click here to see your results now.");
			}
			$("#next-button").css("display","block");
			$("#guess-form").css("display","none");
		};
		// show the form submission, hide the nexzt button
		this.showGuessForm = function(){
			$("#next-button").css("display","none");
			$("#guess-form").css("display","block");
		};
		// alert.
		this.showFeedbackAlert = function(msg){
			//console.log("show feedback");
			$("#feedback").html(msg);
			$("#feedback").css("display","block");
		};
		// end screen.
		this.showEndScreen = function(){
			var h="";
			// create list of results.
			h += "<br/><h3>Here's your breakdown...</h3>";
			h += "<ul class='end-results-list'>";
			var n = this.appData.length;
			var totalYes = 0;
			for(var i=0; i<n; i++){
				var val = this.appData[i].value;
				if(val == "Yes") {
					totalYes++;
					val = "<span style='color:#006400'>"+val+"</span>";
				}else{
					val = "<span style='color:#ff0000'>"+val+"</span>";
				}
				h += "<li>" + this.appData[i].name + ": "+val + "</li>";
			}
			h += "</ul>";
			
			var ev = [
				"You didn't even try, did you?",
				"Well, you got one right at least.",
				"Have you ever used the internet before?",
				"Too old for memes, bro?",
				"Don't share many selfless, huh?",
				"You didn't do too bad!",
				"You're facebooking a lot aren't you?",
				"You know your way around the interwebz.",
				"I bet you like the convenience of shopping online.",
				"Morning coffee and UX study. Nice.",
				"You're a UX mastermind.",
				"L33t internet user!",
			];
			// add the "status"
			h += "<h2 style='padding:20px; width:50%; margin:0 auto; margin-bottom:20px; background:#ffa500; color:#fff;'>"+ev[totalYes]+"</h2>";
			h += "<hr style='width:50%; margin:0 auto; margin-bottom:20px;' />";
			// try again.
			h += "<div id='try-again-button' class='button_blue'>Try again?</div>";
			h += '<br/><br/><span style="color: #a7a7a7; font-size: 0.7em">(using <a target="_blank" style="text-decoration: none; border-bottom: 1px dotted #a7a7a7; color: #a7a7a7;" href="http://w3.eleqtriq.com/2010/08/sqetch-wireframe-toolkit/">Sqetch by electriq</a>)</span><br/>';
			// put the html in
			$("#img_container").html( h );
			// try again
			$("#try-again-button").data("scope", this);
			$("#try-again-button").on("click", function(){ $(this).data("scope").reset(); });
			// hide the top part.
			$("#next-button").css("display","none");
			$("#guess-form").css("display","none");
			//
			$("#pagination").html( "Results!" );
		};
		// random
		this.getRandomBanter = function(){
			var b = [
				"You can do it!",
				"The artist in me cries out for design... so get this right.",
				"The Internet is not some big truck you can just dump things on — it's a series of tubes.",
				"Sometimes I can't figure designers out. Kind of like how you can't figure this question out.",
				"The details are not the details. They make the design. But for now, get the details right.",
				"What the heck's going on right here?",
				"<strong>Did you know?</strong><br><br>It was on August 19th 1995 that JavaScript was first announced, originally code named 'Mocha'.",
				"<strong>Did you know?</strong><br><br>Tim Berners-Lee is credited with the invention of the World Wide Web as we know it today.",
				"<strong>Did you know?</strong><br><br>On August 6, 1991, the first website http://info.cern.ch went online.",
				"According to legend, Amazon became the number one shopping site because in the days before the invention of the search giant Google, Yahoo would list the sites in their directory alphabetically!",
				"The Internet is not some big truck you can just dump things on — it's a series of tubes.",
				"The Internet is not some big truck you can just dump things on — it's a series of tubes.",
				"<strong>Did you know?</strong><br><br>Dynamic design language PHP gained popularity with its PHP3 release in 1998.",
				"<strong>Did you know?</strong><br><br>In 2010, Ethan Marcotte introduced responsive design at 'An Event Apart' in San Diego.",
				"<strong>Did you know?</strong><br><br> In the 1990s Mosaic was introduced to the public, which was a free browser program. Mosaic was the first commercial browser that allowed the public access to online content.",
				"<strong>Did you know?</strong><br><br>Ideas for the World Wide Web date back to as early as 1946 when Murray Leinster wrote a short story which described how computers (that he referred to as 'Logics') lived in every home, with each one having access to a central device where they could retrieve information.",
				"If you dislike Internet users being addressed to as 'surfers', blame Jean Armour Polly. It was she who coined the term 'Surfing the 				Internet'.",
				"<strong>Did you know?</strong><br><br>In 1974, the word 'Internet' first appeared in the 'Internet Transmission Control Program' booklet as a shortening of the term 					'internetworking' or 'inter-system networking.'",
				"It is during our darkest moments that we must focus to see the light. Right now that's you with your trivia skill.",
				"Think harder, faster, better, and smarter..",
				"<strong>Did you know?</strong><br><br>The first ever email was sent in 1971 by Ray Tomilinson, the US programmer who invented the email system.",
				"Keep going...",
				"Sometimes I can't figure designers out...",
				"Do you ever look at your life and think, 'What has the internet done to me?'",
				"Do you ever look at your life and think, 'What has the internet done to me?'",
				"The Internet is the first thing that humanity has built that humanity doesn't understand, the largest experiment in anarchy that we have ever had. (Eric Schmidt, Google)",
				"On the Internet you can be anything you want...",
				"Just skip to the end. All the answers are there.",
				"Really? This question is supposed to be easy.",					
				"Seriously? Just skip it already. lol.",
				"The little engine that couldn't.",
				"You got this. We're on your team.",
				"If you don't succeed, try and try again.",
				"You are a master of the UX, aren't you.",
				"How many (c)licks does it take to get to the center of a...",
				"Don't give up!"
			];
			
			return b[ Math.round(Math.random()*(b.length-1)) ];
		};	
		// skip
		this.skip = function(){
			this.nextSlide();
		};
		// reset
		this.reset = function(){
			this.currentIndex = -1;
			this.wrongAnswersCount = new Array;
			// return values to no
			var n = this.appData.length;
			for(var i=0; i<n; i++) this.appData[i].value = "No";
			// next slide
			this.nextSlide();
		};
	};
	
	$(document).ready(function(){
		var wireframeApp = new App();
		wireframeApp.presentSlide(0);
		// submit form function	
		$("#guess-form").submit(function(e){
			e.preventDefault();
			var answer = $("#website_name").val();
			wireframeApp.submitAnswer(answer);
		});
		// next button function
		$("#next-button").click(function(e){
			wireframeApp.nextSlide();
		});
		// next button function
		$("#skip-button").click(function(e){
			wireframeApp.skip();
		});
		// submit button
		$("#go-button").click(function(e){
			$("#guess-form").submit();
		});
	});
})(jQuery);

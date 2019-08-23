<?php
namespace core_search\output;

// include_once($CFG->dirroot . "/search/classes/output/renderer.php");

// use core_search;


class renderer extends \plugin_renderer_base
{
    const SEARCH_RESULT_STRING_SIZE = 100;
    const SEARCH_RESULT_TEXT_SIZE = 500;

    public function render_results($results, $page, $totalcount, $url, $cat= null)
    {
        global $DB, $USER;
        $content = "<div id='customrender' >";

        $content .= "<div id='customresult' style='display:none;'> ";

        $q = optional_param('q', '', PARAM_NOTAGS); 
        $url = "http://still-oasis-17398.herokuapp.com/home/pdf_search.json?q={$q}&key=HJArYbtHQvpvRcxQFJHjsZkABTBbljekVSTuRUFZPIAZaeXLKs";
        //  Initiate curl
        $ch = curl_init();
        // Will return the response, if false it print the response
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        // Set the url
        curl_setopt($ch, CURLOPT_URL,$url);
        // Execute
        $result=curl_exec($ch);
        // Closing
        curl_close($ch);

        // Will dump a beauty json :3
        // var_dump(json_decode($result, true));

        // select * from mdl_user RIGHT JOIN mdl_user_enrolments on mdl_user.id = mdl_user_enrolments.userid RIGHT JOIN mdl_enrol on mdl_user_enrolments.enrolid = mdl_enrol.id WHERE mdl_user.firstname = "vinay";


        $data = json_decode($result);

        if (is_siteadmin() != 1) {
            $uid = $USER->id;
            $enrolarr = [];
            $count = 0;
            $enroldata = $DB->get_records_sql("select * from {user} RIGHT JOIN {user_enrolments} on {user}.id = {user_enrolments}.userid RIGHT JOIN {enrol} on {user_enrolments}.enrolid = {enrol}.id WHERE {user}.id = $uid");
    
            if (!empty($enroldata)) {
                foreach ($enroldata as $val) {
                    $enrolarr[] = $val->courseid;
                }
            }
           
    
            if(count($data) > 0){
                foreach ($data as $d) {
                    if (in_array($d->course, $enrolarr)) {
                        $desc = substr($d->description,0,260);
                        $desc = Str_replace("{$q}","<mark>{$q}</mark>",$desc);
                        $content .= "
                            <div class='card customcard' style='margin-top:12px;'>
                                <h2 style='text-decoration:underline;' class='card-title ml-3 mt-3'>{$q}</h2>
                                <div class='card-body'>{$desc}</div>
                            </div>
                        ";
                        $count++;
                    }
                }
            }else{
                $content .= '<div class="alert alert-danger" role="alert">
                                Result Not Found!
                            </div>';
                            $count++;
            }
    
            if ($count < 1) {
                $content .= '<div class="alert alert-danger" role="alert">
                                Result Not Found!
                            </div>';
            }   
        }else{
            if(count($data) > 0){
                foreach ($data as $d) {
                    $desc = substr($d->description,0,260);
                    $desc = Str_replace("{$q}","<mark>{$q}</mark>",$desc);
                    $content .= "
                        <div class='card customcard' style='margin-top:12px;'>
                            <h2 style='text-decoration:underline;' class='card-title ml-3 mt-3'>{$q}</h2>
                            <div class='card-body'>{$desc}</div>
                        </div>
                    ";
                }
            }else{
                $content .= '<div class="alert alert-danger" role="alert">
                                Result Not Found!
                            </div>';
            }
        }

        


        $content .= "</div><div id='moodleresult'>";

        if (\core_search\manager::is_search_area_categories_enabled() && !empty($cat)) {
            $toprow = [];
            foreach (\core_search\manager::get_search_area_categories() as $category) {
                $taburl = clone $url;
                $taburl->param('cat', $category->get_name());
                $taburl->param('page', 0);
                $taburl->remove_params(['page', 'areaids']);
                $toprow[$category->get_name()] = new \tabobject($category->get_name(), $taburl, $category->get_visiblename());
            }

            if (\core_search\manager::should_hide_all_results_category()) {
                unset($toprow[\core_search\manager::SEARCH_AREA_CATEGORY_ALL]);
            }

            $content .= $this->tabtree($toprow, $cat->get_name());
        }

        // Paging bar.
        $perpage = \core_search\manager::DISPLAY_RESULTS_PER_PAGE;
        $content .= $this->output->paging_bar($totalcount, $page, $perpage, $url);

        // Results.
        $resultshtml = array();
        foreach ($results as $hit) {
            $resultshtml[] = $this->render_result($hit);
        }
        $content .= \html_writer::tag('div', implode('<hr/>', $resultshtml), array('class' => 'search-results'));

        // Paging bar.
        $content .= $this->output->paging_bar($totalcount, $page, $perpage, $url);
        
        $content .= "</div></div>";
        return $content;
        

    }



    
    public function render_result(\core_search\document $doc) {
        $docdata = $doc->export_for_template($this);

        // Limit text fields size.
        $docdata['title'] = shorten_text($docdata['title'], static::SEARCH_RESULT_STRING_SIZE, true);
        $docdata['content'] = $docdata['content'] ? shorten_text($docdata['content'], static::SEARCH_RESULT_TEXT_SIZE, true) : '';
        $docdata['description1'] = $docdata['description1'] ? shorten_text($docdata['description1'], static::SEARCH_RESULT_TEXT_SIZE, true) : '';
        $docdata['description2'] = $docdata['description2'] ? shorten_text($docdata['description2'], static::SEARCH_RESULT_TEXT_SIZE, true) : '';

        return $this->output->render_from_template('core_search/result', $docdata);
    }



}


